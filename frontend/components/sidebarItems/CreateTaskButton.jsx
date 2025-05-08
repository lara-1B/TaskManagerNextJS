import { IoIosAddCircle } from "react-icons/io";

export default function CreateTaskButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-[100%] px-4 py-2 text-sm md:text-base font-semibold 
                       bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 
                       rounded-md shadow-md hover:shadow-lg transition-all"
        >
            <span className="hidden md:inline">+ Create Task</span>
            <span className="md:hidden">
                <IoIosAddCircle />
            </span>
        </button>
    );
}
