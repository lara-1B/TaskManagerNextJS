import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { updateUser, deleteUser } from "../../services/backendFetch";

export default function AccountModal({ user, onClose, onUserUpdate, onUserDelete }) {
    const [editUser, setEditUser] = useState({ ...user });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setEditUser({ ...user }); // Sync modal state with the latest user data
    }, [user]);

    const handleSaveChanges = async () => {
        try {
            const updatedUser = await updateUser(editUser.id, { role: editUser.role });
            onUserUpdate({ ...editUser, ...updatedUser }); // Immediately update parent state
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(user.id);
            onUserDelete(user.id); // Remove the user from the parent state
            onClose();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
        >
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Manage User</h2>
                {!isEditing ? (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <select
                                value={editUser.role}
                                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleSaveChanges}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md text-sm"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-4 rounded-md text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
