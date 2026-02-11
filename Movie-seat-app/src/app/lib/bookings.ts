import { staticBookings } from "../data/staticBookings";

export async function BookMovie(payload: { movieId: string; seats: string[]; customerName: string; customerPhone: string }) {
  const res = await fetch('http://localhost:3001/bookings', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to crate booking');
  }
  return res.json();
}

export async function fetchBooking( movieId: string) {
  if (process.env.NODE_ENV === "production") {
    return staticBookings.filter(booking => booking.movieId === movieId);
  }
     const res = await fetch(`http://localhost:3001/bookings?movieId=${movieId}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return res.json();
}