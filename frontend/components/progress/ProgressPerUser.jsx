import { useEffect, useState } from "react";
import { getCompletedTasksPerUser } from "../../services/backendFetch";

export default function ProgressPerUser() {
    const [userStats, setUserStats] = useState([]);
    const [sortBy, setSortBy] = useState("mostCompleted"); // Default sorting by most tasks completed
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        async function fetchUserStats() {
            try {
                const stats = await getCompletedTasksPerUser();
                setUserStats(stats);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        }
        fetchUserStats();
    }, []);

    const sortedStats = [...userStats].sort((a, b) => {
        if (sortBy === "mostCompleted") {
            return b.completedTasks - a.completedTasks; // Descending by completed tasks
        } else if (sortBy === "alphabetical") {
            return a.user.localeCompare(b.user); // Alphabetical by name
        }
        return 0;
    });

    if (!userStats.length) {
        return <p>Loading user progress data...</p>;
    }

    return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">User-wise Task Completion</h3>
            <div className="relative mb-6">
                <button
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    Sort By: {sortBy === "mostCompleted" ? "Most Completed" : "A to Z"}
                </button>
                {dropdownOpen && (
                    <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg z-10">
                        <ul>
                            {sortBy !== "mostCompleted" && (
                                <li
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSortBy("mostCompleted");
                                        setDropdownOpen(false);
                                    }}
                                >
                                    Most Completed
                                </li>
                            )}
                            {sortBy !== "alphabetical" && (
                                <li
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSortBy("alphabetical");
                                        setDropdownOpen(false);
                                    }}
                                >
                                    A to Z
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <ul className="divide-y divide-gray-200">
                {sortedStats.map((userStat, index) => (
                    <li key={index} className="flex justify-between items-center py-3">
                        <span className="text-lg font-medium">{userStat.user}</span>
                        <span className="text-gray-600">{userStat.completedTasks} tasks</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
