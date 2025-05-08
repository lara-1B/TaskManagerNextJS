import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../services/backendFetch";
import AccountModal from "../modal/AccountModal";

export default function AccountList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetchAllUsers();
                setUsers(data.map(user => ({ ...user, id: user._id }))); 
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleUserUpdate = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? { ...user, ...updatedUser } : user
            )
        );
        setSelectedUser((prev) => (prev?.id === updatedUser.id ? { ...prev, ...updatedUser } : prev));
    };

    const handleUserDelete = (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setSelectedUser(null);
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    const cardColors = {
        admin: 'bg-rose-100',
        manager: 'bg-yellow-100',
        user: 'bg-blue-100',
    };
    const bgColor = (role) => cardColors[role] || 'bg-gray-100';
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className={`cursor-pointer ${bgColor(user.role)} rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent)] pointer-events-none z-0" />

                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                            <p className="text-sm text-gray-700 mt-1">Email: {user.email}</p>
                            <p className="text-sm text-gray-700 mt-1">Role: {user.role}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <AccountModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onUserUpdate={handleUserUpdate}
                    onUserDelete={handleUserDelete}
                />
            )}
        </div>
    );
}
