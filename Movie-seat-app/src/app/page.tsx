import { fetchMovies } from "./lib/movies";
import MovieSeatsContainer from "./components/MovieSeatsContainer";

export default async function Home() {
  const movies = await fetchMovies();

  return (
    <>
      <MovieSeatsContainer movies={movies} />
    </>
  );
}

