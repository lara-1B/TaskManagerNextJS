import CreateTaskButton from "../sidebarItems/CreateTaskButton";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { IoMdStats, IoMdCalendar, IoMdPie, IoMdPerson, IoMdTrendingUp, IoMdDocument, IoMdLogOut } from "react-icons/io";
import Alert from "../alert/Alert";
import { useRouter } from "next/router";
import Link from "next/link";
import CreateTaskModal from '../modal/CreateTaskModal';
import { TaskContext } from "../../context/TaskContext";

export default function Sidebar() {
    const context = useContext(TaskContext) || {}; 
    const tasks = context.tasks || []; 
    const [taskCount, setTaskCount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

    useEffect(() => {
        setTaskCount(tasks.length); 
    }, [tasks]);

    const handleLogout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <>
            
            <aside
                className="fixed bottom-0 md:top-0 md:left-0 md:h-screen 
                           w-full md:w-64 bg-gradient-to-b from-orange-100 to-gray-50 
                           md:from-gray-50 md:to-orange-100 text-black z-20 
                           flex md:block  flex-col justify-between items-center px-4 py-2 md:p-4 shadow-md"
            >
                <ul className="flex flex-row justify-around md:flex-col md:space-y-4">
                    {/* Section 1: Header */}
                    <li className="hidden md:flex items-center justify-center md:justify-start w-[100%]">
                        <h1 className="w-full text-2xl font-bold text-center">
                            Task Track
                        </h1>
                    </li>

                    {/* Section 2: Create Task Button */}
                    {role === "admin" || role === "manager" ? (
                        <li className="flex items-center justify-center md:justify-start">
                            <CreateTaskButton onClick={() => setIsModalOpen(true)} />
                        </li>
                    ) : null}
                    {/* Section 3: Main */}
                    <li className="font-semibold text-lg hidden md:block">Main</li>

                    <Link href="/dashboard">
                        <motion.li className="flex items-center justify-between space-x-2 cursor-pointer p-1 rounded-md relative group hover:bg-gradient-to-r hover:from-blue-100 hover:via-blue-50 hover:to-blue-100">
                            <div className="flex items-center space-x-2 w-full">
                                <IoMdStats className="text-xl md:text-base pt-2 md:pt-0" /> {/* Add padding-top */}
                                <span className="hidden md:inline">Dashboard</span>
                            </div>
                            <span className="text-sm md:text-base font-semibold bg-gray-100 text-black-800 px-2 py-1 rounded-md">
                                {taskCount}
                            </span>
                        </motion.li>
                    </Link>

                    <Link href="/schedule">
                        <motion.li className="flex items-center space-x-2 cursor-pointer p-1 rounded-md group hover:bg-gradient-to-r hover:from-blue-100 hover:via-blue-50 hover:to-blue-100">
                            <IoMdCalendar className="text-xl md:text-base pt-2 md:pt-0" /> {/* Add padding-top */}
                           
                            <span className="hidden md:inline">Schedule</span>
                        </motion.li>
                    </Link>
                    {/* Section 4: Report */}
                    <li className="font-semibold text-lg mt-4 hidden md:block">Report</li>

                    <Link href="/accounts">
                        <motion.li className="flex items-center space-x-2 cursor-pointer p-1 rounded-md group hover:bg-gradient-to-r hover:from-gray-100 hover:via-gray-50 hover:to-gray-100">
                            <IoMdPerson className="text-xl md:text-base" /> {/* Adjust icon size */}
                            <span className="hidden md:inline">Accounts</span>
                        </motion.li>
                    </Link>

                    <Link href="/progress">
                        <motion.li className="flex items-center space-x-2 cursor-pointer p-1 rounded-md group hover:bg-gradient-to-r hover:from-gray-100 hover:via-gray-50 hover:to-gray-100">
                            <IoMdTrendingUp className="text-xl md:text-base" /> {/* Adjust icon size */}
                            <span className="hidden md:inline">Progress</span>
                        </motion.li>
                    </Link>

                    {/* Section 5: Logs */}
                    <li className="font-semibold text-lg mt-4 hidden md:block">Logs</li>

                    <Link href="/logs">
                        <motion.li className="flex items-center space-x-2 cursor-pointer p-1 rounded-md group hover:bg-gradient-to-r hover:from-gray-100 hover:via-gray-50 hover:to-gray-100">
                            <IoMdDocument className="text-xl md:text-base" /> {/* Adjust icon size */}
                            <span className="hidden md:inline">Logs</span>
                        </motion.li>
                    </Link>

                    {/* Section 6: Logout */}
                    <li className="mt-4">
                        <button
                            onClick={() => setShowAlert(true)}
                            className="w-full px-4 py-2 text-sm md:text-base font-semibold 
                                       bg-red-500 text-white rounded-md shadow-md hover:shadow-lg 
                                       transition-all flex items-center justify-center space-x-2"
                        >
                            <IoMdLogOut className="text-xl md:text-base" /> {/* Adjust icon size */}
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </li>
                </ul>

                {showAlert && (
                    <Alert
                        message="Are you sure you want to logout?"
                        onClose={() => setShowAlert(false)}
                        onConfirm={handleLogout}
                    />
                )}
            </aside>
            <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
