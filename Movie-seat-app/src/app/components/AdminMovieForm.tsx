"use client"

import { useState } from "react";
import { Movie } from "../types/Movie";
import { createMovie, deleteMovie, updateMovie } from "../lib/movies";
import { useRouter } from "next/navigation";

type AdminMovieFormProps = {
    movies: Movie[];
}

export default function AdminMovieForm({ movies }: AdminMovieFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [poster, setPoster] = useState("");
    const [showUpdateButton, setShowUpdateButton] = useState(true);
    const [showCreateButton, setShowCreateButton] = useState(false);
    const [showCreateMovie, setShowCreateMovie] = useState(true);
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.refresh();
    }

    async function handleDeleteMovie(movieId: string) {
        try {
            await deleteMovie(movieId);
            router.refresh();
        } catch (error) {
            console.error("Failed to delete movie:", error);
        }
    }

    async function handleCreateMovie() {
        const payload = {
            title,
            year,
            price: Number(price),
            poster,
        }
        try {
            await createMovie(payload);
            alert("Movie created successfully!");
            setTitle("");
            setYear("");
            setPrice("");
            setPoster("");
            router.refresh();
        } catch (error) {
            console.error("Failed to create movie:", error);
        }
    }

    function fillUpdateForm(movie: Movie) {
        setTitle(movie.title || "");
        setYear(movie.year || "");
        setPrice(String(movie.price || ""));
        setPoster(movie.poster || "");
        setShowUpdateButton(true);
        setShowCreateButton(false);
        setSelectedMovieId(String(movie.id));
    }

    async function handleUpdateMovie(movieId: string | null) {
        if (!movieId) {
            console.error("No movie ID provided for update.");
            return;
        }
        const payload = {
            title: title || undefined,
            year: year || undefined,
            price: price ? Number(price) : undefined,
            poster: poster || undefined,
        }
        try {
            await updateMovie(movieId, payload);
            alert("Movie updated successfully!");
            setSelectedMovieId(null);
            setTitle("");
            setYear("");
            setPrice("");
            setPoster("");
            router.refresh();
        } catch (error) {
            console.error("Failed to update movie:", error);
        }
    }

    return (
        <form className="w-full text-black" onSubmit={onSubmit}>
            {movies.map((movie) => (
                <div key={movie.id} className="flex justify-between m-4 border-b pb-2">
                    {movie.title} ({movie.price} kr)
                    <div className="flex gap-1">
                        <button type="button" className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
                            onClick={() => handleDeleteMovie(String(movie.id))}>Delete</button>

                        <button type="button" className="rounded-lg border bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-100" onClick={() => { fillUpdateForm(movie); setShowUpdateButton(true) }}>Update movie</button>
                    </div>

                </div>
            ))}

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700"> Title </label>
                    <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-black/10" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700"> Year </label>
                    <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-black/10" value={year} onChange={(e) => setYear(e.target.value)} />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700"> Price </label>
                    <input type="number" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-black/10" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700"> Poster </label>
                    <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-black/10" value={poster} onChange={(e) => setPoster(e.target.value)} />
                </div>

                {selectedMovieId ? (
                    <button type="button" className="rounded-xl bg-black px-3 py-2 text-xs font-medium text-white hover:opacity-90"
                        onClick={() => handleUpdateMovie(selectedMovieId)}>Save update</button>
                ) : (
                    <button type="button" className="rounded-xl bg-black px-3 py-2 text-xs font-medium text-white hover:opacity-90" onClick={handleCreateMovie}>Create</button>
                )
                }
            </div>
        </form>
    )
}
