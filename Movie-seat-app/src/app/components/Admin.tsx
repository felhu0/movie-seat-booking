"use client"
import { useState } from "react";
import AdminMovieForm from "./AdminMovieForm";
import { Movie } from "../types/Movie";

type AdminProps = {
    movies: Movie[];
}

export default function Admin({ movies }: AdminProps) {
    const [showAdminForm, setShowAdminForm] = useState(false);
    return (
        <div>
            <button
                onClick={() => setShowAdminForm(true)}
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text hover:opacity-90"
            >
                Admin
            </button>

            {showAdminForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                        <button
                            onClick={() => setShowAdminForm(false)}
                            className="absolute right-3 top-3 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                        >
                            ✕
                        </button>
                        <AdminMovieForm movies={movies} />
                    </div>
                </div>
            )}
        </div>
    )
}
