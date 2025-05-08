import { useEffect, useState } from "react";
import { getTaskCompletionStats, getOverdueTasks } from "../../services/backendFetch";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

export default function ProgressChart() {
    const [stats, setStats] = useState(null);
    const [overdue, setOverdue] = useState(null);
    const [overduePercentage, setOverduePercentage] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const statsData = await getTaskCompletionStats();
                setStats(statsData);

                const overdueData = await getOverdueTasks();
                setOverdue(overdueData);

                if (statsData && overdueData) {
                    const percentage = ((overdueData.overdueTasks / statsData.totalTasks) * 100).toFixed(2);
                    setOverduePercentage(percentage);
                }
            } catch (error) {
                console.error("Error fetching progress data:", error);
            }
        }
        fetchData();
    }, []);

    if (!stats || !overdue) {
        return <p>Loading progress data...</p>;
    }

    return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold">Progress Overview</h3>
            <div className="mt-4">
                <p>Total Tasks: {stats.totalTasks}</p>
                <p>Completed Tasks: {stats.completedTasks}</p>
                <div className="w-32 h-32 mx-auto mt-4">
                    <motion.div
                        initial={{ value: 0 }}
                        animate={{ value: stats.completionRate }}
                        transition={{ duration: 1 }}
                    >
                        <CircularProgressbar
                            value={stats.completionRate}
                            text={`${stats.completionRate}%`}
                            styles={{
                                path: { stroke: "#10B981" },
                                text: { fill: "#10B981", fontSize: "16px" },
                            }}
                        />
                    </motion.div>
                </div>
                <p className="mt-2">Completion Rate: {stats.completionRate}%</p>
            </div>
            <div className="mt-6">
                <p className="text-red-500 font-bold">Overdue Tasks: {overdue.overdueTasks}</p>
                <p className="text-red-500">Overdue Task Percentage: {overduePercentage}%</p>
            </div>
        </div>
    );
}
