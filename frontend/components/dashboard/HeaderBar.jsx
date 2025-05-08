import { FaThLarge, FaSortAmountDownAlt } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';

export default function HeaderBar() {
  const { tasks, setFilteredTasks } = useContext(TaskContext);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [usedSort, setUsedSort] = useState('Deadline');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' }); // Get current month's name

  const filterByPriority = (priority) => {
    if (priority === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filteredTasks = tasks.filter((task) => task.priority === priority);
      setFilteredTasks(filteredTasks);
    }
  };

  const filterByStatus = (status) => {
    if (status === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filteredTasks = tasks.filter((task) => task.status === status);
      setFilteredTasks(filteredTasks);
    }
  };

  const filterByAssignedTo = (userId) => {
    if (userId === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filteredTasks = tasks.filter((task) => task.assignedTo._id === userId);
      setFilteredTasks(filteredTasks);
    }
  };

  const sortByDeadline = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setFilteredTasks(sortedTasks);
    setUsedSort('Deadline');
    setSortDropdownOpen(false);
  };

  const sortByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setFilteredTasks(sortedTasks);
    setUsedSort('Priority');
    setSortDropdownOpen(false);
  };

  const sortByTitle = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    setFilteredTasks(sortedTasks);
    setUsedSort('Title');
    setSortDropdownOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Left Section - Date & Board Selector */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">{currentMonth}</h2> {/* Display current month's name */}
          <p className="text-sm text-gray-500">Today is {today}</p>
        </div>

        <div className="md:ml-6">
          <span className="text-md font-semibold">Priority</span>
          <select
            className="ml-2 bg-transparent font-medium border-none focus:ring-0 text-gray-700"
            onChange={(e) => filterByPriority(e.target.value)}
          >
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="md:ml-6">
          <span className="text-md font-semibold">Status</span>
          <select
            className="ml-2 bg-transparent font-medium border-none focus:ring-0 text-gray-700"
            onChange={(e) => filterByStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="md:ml-6">
          <span className="text-md font-semibold">Assigned To</span>
          <select
            className="ml-2 bg-transparent font-medium border-none focus:ring-0 text-gray-700"
            onChange={(e) => filterByAssignedTo(e.target.value)}
          >
            <option value="all">All</option>
            <option value="681647466aefac9d481bc979">User</option>
            <option value="6815fdabed50d72fed483c09">Admin</option>
          </select>
        </div>
      </div>

      {/* Right Section - Filters */}
      <div className="flex gap-4 flex-wrap justify-start md:justify-end relative">
        <button
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700"
          onClick={() => setFilteredTasks(tasks)}
        >
          <FaThLarge />
          Reset Filters
        </button>
        <button
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700"
          onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
        >
          <FaSortAmountDownAlt />
          Sort By: {usedSort}
        </button>
        {sortDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
            <ul>
              {usedSort !== 'Deadline' && (
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={sortByDeadline}
                >
                  Deadline
                </li>
              )}
              {usedSort !== 'Priority' && (
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={sortByPriority}
                >
                  Priority
                </li>
              )}
              {usedSort !== 'Title' && (
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={sortByTitle}
                >
                  Title
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
