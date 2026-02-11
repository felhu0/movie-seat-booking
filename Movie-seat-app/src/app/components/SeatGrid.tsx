import SeatRow from "./SeatRow";

type SeatGridProps = {
    seatLayout: boolean[][];
    selectedSeats: string[];
    toggleSeat: (seatId: string, isOccupied: boolean) => void;
    occupiedSeats: Set<string>;
};

export default function SeatGrid({
    seatLayout,
    selectedSeats,
    toggleSeat,
    occupiedSeats,
}: SeatGridProps) {
    return (
        <div className="mx-auto mb-8 [perspective:1000px]">
            <div className="my-4 h-[70px] w-full bg-white [transform:rotateX(-45deg)] shadow-[0_3px_10px_rgba(255,255,255,0.7)]"></div>
            {/* Loppar igenom varje rad */}
            {seatLayout.map((row, rowIndex) => (
                <SeatRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    selectedSeats={selectedSeats}
                    toggleSeat={toggleSeat}
                    occupiedSeats={occupiedSeats}
                />
            ))}
        </div>
    )
}