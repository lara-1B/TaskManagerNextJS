import { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import AccountList from "../components/accounts/AccountList";

export default function Accounts() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkedRole, setCheckedRole] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("role");
        setIsAdmin(role === "admin");
        setCheckedRole(true);
    }, []);

    if (!checkedRole) {
        return null; 
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
                <h2 className="text-2xl font-bold">Accounts Page</h2>
                <p className="mt-2">Manage user accounts below:</p>
                <AccountList />
            </main>
        </div>
    );
}
