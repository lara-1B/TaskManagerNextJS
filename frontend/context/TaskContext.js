import { createContext, useState, useEffect } from 'react';
import { fetchTasks } from '../services/backendFetch';

export const TaskContext = createContext();

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredTasks(
        tasks.filter(task =>
          task.title.toLowerCase().includes(lowerCaseQuery) ||
          task.description.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  }, [searchQuery, tasks]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setFilteredTasks((prevTasks) => [...prevTasks, newTask]); // Update filtered tasks as well
  };

  const markTaskComplete = async (taskId) => {
    try {
        const updatedTask = await backendFetch.markTaskComplete(taskId); // Call the backend API
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, ...updatedTask } : task
            )
        );
        setFilteredTasks((prevFilteredTasks) =>
            prevFilteredTasks.map((task) =>
                task._id === taskId ? { ...task, ...updatedTask } : task
            )
        ); // Ensure filteredTasks is updated
    } catch (error) {
        console.error('Error marking task as complete:', error);
    }
};

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        setFilteredTasks, // Expose setFilteredTasks
        searchQuery,
        setSearchQuery,
        loading,
        addTask, // Expose the addTask method
        markTaskComplete, // Expose the markTaskComplete method
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
