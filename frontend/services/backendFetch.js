import axios from 'axios';
import * as urls from './apiUrls';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {}; 
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const handleAxiosError = (error) => {
  if (error.response && error.response.status === 401) {
    console.error('Error: Unauthorized access. Redirecting to login.');
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
    return null; 
  }
  throw error;
};

// User Auth
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(urls.login, credentials);
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(urls.register, userData);
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await axios.get(urls.getAllUsers, getAuthHeaders());
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateUser = async (userId, roleData) => {
  try {
    const url = urls.updateUser(userId); // Ensure this generates the correct URL
    console.log("Updating user:", { url, roleData }); // Debugging log
    const res = await axios.put(url, roleData, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error("Error in updateUser:", error.response?.data || error.message); // Log server response
    handleAxiosError(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const url = urls.deleteUser(userId); // Ensure this generates the correct URL
    console.log("Deleting user:", { url }); // Debugging log
    const res = await axios.delete(url, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error("Error in deleteUser:", error.response?.data || error.message); // Log server response
    handleAxiosError(error);
  }
};

// Tasks
export const fetchTasks = async () => {
  try {
    const res = await axios.get(urls.getAllTasks, getAuthHeaders());
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTask = async (taskData) => {
  try {
    const res = await axios.post(urls.createTask, taskData, getAuthHeaders());
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const res = await axios.put(urls.updateTask(taskId), updates, getAuthHeaders());
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(urls.deleteTask(taskId), getAuthHeaders());
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const markTaskComplete = async (taskId) => {
  try {
    const res = await axios.put(urls.completeTask(taskId), {}, getAuthHeaders());
    return res.data; // Return the updated task
  } catch (error) {
    handleAxiosError(error);
  }
};

export const assignTask = async (taskId, userId) => {
  try {
    const res = await axios.post(
      urls.assignTask(taskId),
      { assignedTo: userId },
      getAuthHeaders()
    );
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Audit Logs
export const fetchAuditLogs = async (filters = {}) => {
  try {
    const res = await axios.get(urls.getAuditLogs, {
      ...getAuthHeaders(),
      params: filters,
    });
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Analytics
export const getTaskCompletionStats = async () => {
  try {
    const res = await axios.get(urls.getTaskCompletionStats, getAuthHeaders());
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getOverdueTasks = async () => {
  try {
    const res = await axios.get(urls.getOverdueTasks, getAuthHeaders());
    return res.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getCompletedTasksPerUser = async () => {
  try {
    const res = await axios.get(urls.getCompletedTasksPerUser, getAuthHeaders());
    return res.data.taskCompletionStats; // Ensure the backend returns the correct structure
  } catch (error) {
    handleAxiosError(error);
  }
};

export const markNotificationRead = async (notificationId) => {
  try {
    const headers = getAuthHeaders();
    console.log('Headers:', headers); // Debugging headers
    const res = await axios.put(
      urls.markNotificationRead(notificationId),
      {},
      headers
    );
    return res.data;
  } catch (error) {
    console.error('Error marking notification as read:', error.response?.data || error.message);
    handleAxiosError(error);
  }
};

export const fetchNotifications = async () => {
  try {
    const res = await axios.get(urls.getNotifications, getAuthHeaders());
    return res.data; // Ensure the backend returns the correct notification structure
  } catch (error) {
    console.error('Error fetching notifications:', error.response?.data || error.message);
    handleAxiosError(error);
  }
};
