"use client";

import { useEffect, useState } from "react";
import MovieSelector from "./MovieSelector";
import Showcase from "./Showcase";
import SeatGrid from "./SeatGrid";
import { Movie } from "../types/Movie";
import BookingForm from "./BookingForm";
import { Booking } from "../types/Booking";
import { fetchBooking } from "../lib/bookings";
import Admin from "./Admin";

export default function MovieSeatsContainer({ movies }: { movies: Movie[] }) {
    const [selectedMovieId, setSelectedMovieId] = useState<string>(movies?.[0]?.id ?? "");
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const occupiedSeats = new Set(bookings.flatMap(booking => booking.seats));
    const seatLayout: boolean[][] = Array.from({ length: 6 }, () =>
        Array.from({ length: 8 }, () => false))

    //Hämtar nya bokningar och uppdatera UI via state, utan att behöva ladda om sidan.
    async function loadBookings(movieId: string) {
        setLoadingBookings(true);
        try {
            const data = (await fetchBooking(movieId) as Booking[]);
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setBookings([]);
        } finally {
            setLoadingBookings(false);
        }
    }

    //Den körs varje gång selectedMovieId ändras, nollställer valda säten och hämtar bokningar för den nya filemn, uppdaterar UI via state.
    useEffect(() => {
        if (!selectedMovieId) return;
        setSelectedSeats([]);
        loadBookings(selectedMovieId);
    }, [selectedMovieId]);

    function toggleSeat(seatId: string, isOccupied: boolean) {
        if (isOccupied) return;
        {/* Om ture behåll alla utom det klickade sätet, om false lägg till det nya sätet sist*/ }
        setSelectedSeats(prev => {
            const next = prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
            return next;
        });
    }

    const count = selectedSeats.length;
    const ticketPrice = movies.find(m => m.id === selectedMovieId)?.price ?? 0;
    const total = count * ticketPrice;

    return (
        <main className=" bg-[#242333] text-white flex justify-center px-4">
            <div className="w-full max-w-md flex flex-col items-center gap-2">
                <MovieSelector
                    movies={movies}
                    selectedMovieId={selectedMovieId}
                    setSelectedMovieId={setSelectedMovieId}
                />
                <Showcase />

                <SeatGrid
                    seatLayout={seatLayout}
                    selectedSeats={selectedSeats}
                    toggleSeat={toggleSeat}
                    occupiedSeats={occupiedSeats}
                />
                <div className="flex gap-2">
                    <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text hover:opacity-90" onClick={() => setShowBookingForm(true)}>Book</button>
                    {showBookingForm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="bg-white text-black rounded-2xl p-6 w-full max-w-md relative">
                                <button onClick={() => setShowBookingForm(false)} className="absolute top-2 right-3 text-xl">X</button>
                                <BookingForm selectedMovieId={selectedMovieId} selectedSeats={selectedSeats} onBookingSuccess={() => { loadBookings(selectedMovieId); setShowBookingForm(false); }} onClose={() => setShowBookingForm(false)} />
                            </div>
                        </div>
                    )}

                    <Admin movies={movies} />
                </div>

                <p className="text">
                    You have selected <span>{count}</span> seats for a price of $
                    <span>{total}</span>
                </p>
            </div>
        </main>

    );
}
