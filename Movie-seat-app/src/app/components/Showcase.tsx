export default function Showcase() {
    return (
        <ul className="flex justify-between gap-4 rounded-lg bg-black/20 px-4 py-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
                <div className="h-3 w-4 rounded-t-lg bg-gray-600" />
                <small>N/A</small>
            </li>

            <li className="flex items-center gap-2">
                <div className="h-3 w-4 rounded-t-lg bg-cyan-300" />
                <small>Selected</small>
            </li>

            <li className="flex items-center gap-2">
                <div className="h-3 w-4 rounded-t-lg bg-white" />
                <small>Occupied</small>
            </li>
        </ul>
    );
}
