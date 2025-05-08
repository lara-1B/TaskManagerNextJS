import { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import ProgressChart from "../components/progress/ProgressChart";
import ProgressPerUser from "..//components/progress/ProgressPerUser";

export default function Progress() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkedRole, setCheckedRole] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("role");
        setIsAdmin(role === "admin");
        setCheckedRole(true);
    }, []);

    if (!checkedRole) {
        return null; // Optionally, show a loading spinner here
    }

    if (!isAdmin) {
        return (
            <div className="pt-16 md:pl-64 pb-20">
                <Header showSearch={false} />
                <Sidebar />
                <main className="p-4">
                    <h2 className="text-2xl font-bold">Access Denied</h2>
                    <p className="mt-2">Sorry, only admins can access this page.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="pt-16 md:pl-64 pb-20">
            <Header showSearch={false} />
            <Sidebar />
            <main className="p-4">
                <h2 className="text-2xl font-bold">Progress Page</h2>
                <p className="mt-2">You are currently on the Progress page.</p>
                <ProgressChart />
                <ProgressPerUser/>
            </main>
        </div>
    );
}
