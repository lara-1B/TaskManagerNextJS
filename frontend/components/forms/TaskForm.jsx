import { useState, useEffect, useContext } from 'react';
import { fetchAllUsers, createTask } from '../../services/backendFetch'; // Import createTask API
import Alert from '../alert/CommonAlert';
import { TaskContext } from '../../context/TaskContext';

export default function TaskForm({ onClose }) {
  const taskContext = useContext(TaskContext);
  const addTask = taskContext?.addTask; // Safely access addTask

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    assignedTo: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAllUsers()
      .then((data) => setUsers(data))
      .catch(() => setError('Failed to fetch users.'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleAssignedToChange = (e) => {
    const selectedUserId = e.target.value; // Get the user ID from the dropdown
    setTaskData({ ...taskData, assignedTo: selectedUserId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    if (!addTask) {
      setError('Task context is not available. Please try again from dashboard.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newTask = await createTask(taskData); // Call the backend API to create the task
      addTask(newTask); // Add the new task to the context
      setSuccessMessage('Task created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error creating task:', err.response?.data || err.message); // Log error details
      setError(err.response?.data?.message || 'Failed to create task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && <Alert message={successMessage} onClose={() => setSuccessMessage('')} />}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-black mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-black mb-1">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-black mb-1">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-black mb-1">
          Priority
        </label>
        <select
          name="priority"
          id="priority"
          value={taskData.priority}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <label htmlFor="assignedTo" className="block text-sm font-medium text-black mb-1">
          Assign To
        </label>
        <select
          name="assignedTo"
          id="assignedTo"
          value={taskData.assignedTo}
          onChange={handleAssignedToChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-xl shadow-md hover:bg-gray-400 transition duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
