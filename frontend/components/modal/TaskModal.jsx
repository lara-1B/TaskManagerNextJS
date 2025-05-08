import { FaCalendarAlt } from 'react-icons/fa';
import { motion } from "framer-motion";
import { markTaskComplete, updateTask, fetchAllUsers, deleteTask } from '../../services/backendFetch';
import { useState, useEffect } from 'react';

export default function TaskModal({ task, isOpen, onClose, onTaskUpdate }) {
  if (!isOpen) return null;

  const [localTask, setLocalTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState({ ...task });
  const [users, setUsers] = useState([]);

  const isAdmin = localStorage.getItem('role') === 'admin';

  const priorityColors = {
    High: 'bg-rose-100 text-rose-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800',
  };

  const cardColors = {
    High: 'bg-rose-100',
    Medium: 'bg-yellow-100',
    Low: 'bg-blue-100',
  };

  const cardBgColor = cardColors[localTask.priority] || 'bg-gray-100';
  const bgColor = priorityColors[localTask.priority] || 'bg-gray-100 text-gray-800';

  const dueDate = new Date(localTask.dueDate);
  const today = new Date();
  const timeDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await fetchAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isEditing) {
      fetchUsers();
    }
  }, [isEditing]);

  const handleCompleteTask = async () => {
    try {
      await markTaskComplete(localTask._id);
      const updatedTask = {
        ...localTask,
        status: 'Completed',
        completedBy: 'You',
        completionDate: new Date().toISOString(),
      };
      setLocalTask(updatedTask);
      onTaskUpdate(updatedTask);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedTask = await updateTask(editTask._id, editTask);
      setLocalTask(updatedTask);
      onTaskUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(localTask._id);
      onClose(); // Close the modal after deletion
      onTaskUpdate(null); // Notify parent to remove the task
    } catch (error) {
      console.error('Error deleting task:', error);
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
      <div className={`${cardBgColor} bg-gradient-to-br from-${cardBgColor} to-white/90 rounded-2xl p-6 shadow-xl max-w-2xl w-full relative overflow-hidden`}>
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent)] pointer-events-none z-0" />

        {/* Content */}
        <div className="relative z-10">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            <span className={`${bgColor} text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}>
              #{localTask.priority}
            </span>
            <span className="bg-white/60 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              #{localTask.status}
            </span>
          </div>

          {/* Title & Description */}
          {!isEditing ? (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{localTask.title}</h2>
              <p className="text-gray-700 mb-6">{localTask.description}</p>
            </>
          ) : (
            <>
              <input
                type="text"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                className="w-full mb-2 p-2 border rounded-md"
                placeholder="Title"
              />
              <textarea
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                className="w-full mb-6 p-2 border rounded-md"
                placeholder="Description"
              />
            </>
          )}

          {/* Details */}
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>Task ID:</strong> {localTask._id}</p>
            <p><strong>Created By:</strong> {localTask.createdBy}</p>
            <p>
              <strong>Assigned To:</strong>{' '}
              {!isEditing ? (
                localTask.assignedTo?.name || 'Not assigned'
              ) : (
                <select
                  value={editTask.assignedTo}
                  onChange={(e) => setEditTask({ ...editTask, assignedTo: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              )}
            </p>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-600" />
              {!isEditing ? (
                <span>Due: {timeDiff > 0 ? `in ${timeDiff} days` : 'Today'}</span>
              ) : (
                <input
                  type="date"
                  value={editTask.dueDate.split('T')[0]}
                  onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                  className="p-2 border rounded-md"
                />
              )}
            </div>
            <p>
              <strong>Priority:</strong>{' '}
              {!isEditing ? (
                localTask.priority
              ) : (
                <select
                  value={editTask.priority}
                  onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                  className="p-2 border rounded-md"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              )}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {!isEditing ? (
                localTask.status
              ) : (
                <select
                  value={editTask.status}
                  onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                  className="p-2 border rounded-md"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              )}
            </p>
            {localTask.status === 'Completed' && (
              <p><strong>Completed By:</strong> {localTask.completedBy}</p>
            )}
          </div>

          {/* Bottom Buttons */}
          <hr className="my-6" />
          <div className="flex justify-end gap-3">
            {isAdmin && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md text-sm transition duration-200"
              >
                Edit
              </button>
            )}
            {isEditing && (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-md text-sm transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleDeleteTask}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md text-sm transition duration-200"
                >
                  Delete Task
                </button>
              </>
            )}
            {localTask.status !== 'Completed' && (
              <button
                onClick={handleCompleteTask}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md text-sm transition duration-200"
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
