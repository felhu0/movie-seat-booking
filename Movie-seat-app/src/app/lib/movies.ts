import { staticMovies } from "../data/staticMovies";
import { Movie } from "../types/Movie";

export async function fetchMovies() : Promise<Movie[]> {
  try {
    if (process.env.NODE_ENV === "production") {
    return staticMovies;
  }
  const res = await fetch("http://localhost:3001/movies", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Fetch failed");
      }
      return res.json();

  } catch (error) {
    console.error("fetchMovies error:", error);
    return staticMovies;
  }  
}

export async function deleteMovie(movieId : string) {
  const res = await fetch(`http://localhost:3001/movies/${movieId}`, {
     method: "DELETE"
  });
  if (!res.ok) {
    throw new Error('Failed to delete movie');
  }
  return res.json();
}

export async function createMovie(payload: { title: string; year: string; price: number; poster: string }) {
  const res = await fetch('http://localhost:3001/movies', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error('Failed to create movie');
  }
  return res.json();
}

export async function updateMovie(movieId: string, payload: { title?: string; year?: string; price?: number; poster?: string }) {
  const res = await fetch(`http://localhost:3001/movies/${movieId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error('Failed to update movie');
  }
  return res.json();
}