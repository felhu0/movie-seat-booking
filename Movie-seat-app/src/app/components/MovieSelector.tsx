import { Movie } from "../types/Movie"

type MovieSelectorProps = {
    movies: Movie[];
    selectedMovieId: string;
    setSelectedMovieId: (id: string) => void;
}
//Komponent för att välja film
export default function MovieSelector({
    movies,
    selectedMovieId,
    setSelectedMovieId
}: MovieSelectorProps) {
    return (
        <div className="bg-[#242333] text-white flex flex-col items-center justify-center px-4  py-6 mt-20 w-full">
            <div className="w-full max-w-3xl flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                    <label className="text-lg font-semibold" htmlFor="movie">Pick a movie:</label>
                    <select
                        className="text-black bg-white h-7 rounded-md px-2"
                        id="movie"
                        value={selectedMovieId}
                        onChange={(e) => setSelectedMovieId(String(e.target.value))}
                    >
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title} ({movie.price} kr)
                            </option>
                        ))}
                    </select>
                </div>

            </div>

        </div>
    )
}
