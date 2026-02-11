export type Booking = {
    movieId: string;
    seats: string[];
    customerName: string;
    customerPhone: number;
}

export type Bookingdb = {
    id: number;
    movieId: string;
    seats: string[];
    customerName: string;
    customerPhone: number;
}