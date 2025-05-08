// const scheme = 'http';
// const host = 'localhost:5000'; // Ensure this matches your backend server's host and port
// const base = `${scheme}://${host}/api`;

const base = `${process.env.NEXT_PUBLIC_API_BASE}/api`;

export const login = `${base}/users/login`;                 
export const register = `${base}/users/register`;           
export const getAllUsers = `${base}/users`;                  
export const getUserById = (id) => `${base}/users/${id}`;  
export const updateUser = (id) => `${base}/users/${id}/role`;  
export const deleteUser = (id) => `${base}/users/${id}`;       

export const getAllTasks = `${base}/tasks`;                 
export const getTaskById = (id) => `${base}/tasks/${id}`;  
export const createTask = `${base}/tasks`;                  
export const updateTask = (id) => `${base}/tasks/${id}`;  
export const deleteTask = (id) => `${base}/tasks/${id}`; 
export const completeTask = (id) => `${base}/tasks/${id}/complete`; 
export const getAuditLogs = `${base}/audit-logs`;  
export const getNotifications = `${base}/notifications`     
export const markNotificationRead = (id) => `${base}/notifications/${id}/read`;  
export const getTaskCompletionStats = `${base}/analytics/task-completion`; 
export const getOverdueTasks = `${base}/analytics/overdue-tasks`; 
export const getCompletedTasksPerUser = `${base}/analytics/completed-tasks-per-user`; 
export const assignTask = (id) => `${base}/tasks/assign/${id}`;
export const markTaskComplete = (id) => `${base}/tasks/${id}/complete`;
