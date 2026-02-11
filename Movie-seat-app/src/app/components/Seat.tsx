type SeatProps = {
    isSelected: boolean;
    isOccupied: boolean;
    onClick: () => void;
};

export default function Seat({ isSelected, isOccupied, onClick }: SeatProps) {
    return (
        <div
            className={`seat
             ${isOccupied ? "occupied" : ""}
             ${isSelected ? "selected" : ""}
             `}
            onClick={onClick}
        />
    )
}