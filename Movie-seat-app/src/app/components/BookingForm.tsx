"use client";
import { useState } from "react";
import { BookMovie } from "../lib/bookings";

type BookingFormProps = {
    selectedMovieId: string;
    selectedSeats: string[];
    onBookingSuccess: () => void;
    onClose: () => void;
}

export default function BookingForm({ selectedMovieId, selectedSeats, onBookingSuccess }: BookingFormProps) {
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat to book.");
            return;
        }

        if (userName === "" || userName.length < 2) {
            alert("Please enter a valid name. Name must be at least 2 characters long.");
            return;
        }

        if (phone === "" || phone.length < 5 || !/^\d+$/.test(phone)) {
            alert("Please enter a valid phone number. Phone number must be at least 5 digits long and contain only numbers.");
            return;
        }

        const payload = {
            movieId: selectedMovieId,
            seats: selectedSeats,
            customerName: userName,
            customerPhone: phone,
        }
        await BookMovie(payload);
        setUserName("");
        setPhone("");
        alert("Booking successful!");
        onBookingSuccess();
    };

    return (
        <form className="w-full max-w-md rounded-2xl bg-white p-5 text-black shadow-lg" onSubmit={onSubmit}>
            <div className="mb-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-5 text-black shadow-lg mb-4">
                    <label> Name </label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="w-full max-w-md rounded-2xl bg-white p-5 text-black shadow-lg">
                    <label> Phone </label>
                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit" className="w-full rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 active:opacity-80 mt-4">Book Seats</button>
            </div>
        </form>
    )
}