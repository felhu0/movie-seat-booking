import Seat from "./Seat";

type SeatRowProps = {
    row: boolean[];
    rowIndex: number;
    selectedSeats: string[];
    toggleSeat: (seatId: string, isOccupied: boolean) => void;
    occupiedSeats: Set<string>;
};

export default function SeatRow({ row, rowIndex, selectedSeats, toggleSeat, occupiedSeats }: SeatRowProps) {
    return (
        <div className="row" key={rowIndex}>
            {/* Loppar igenom varje plats i raden */}
            {row.map((_, seatIndex) => {
                const seatId = `${rowIndex}-${seatIndex}`;
                const isSelected = selectedSeats.includes(seatId);
                const isOccupied = occupiedSeats.has(seatId);

                return (
                    <Seat
                        key={seatId}
                        isSelected={isSelected}
                        isOccupied={isOccupied}
                        onClick={() => toggleSeat(seatId, isOccupied)}//När någon klickar, kör toggleSeat i parent.
                    />
                );
            })}
        </div>
    )
}