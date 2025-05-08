const Task = require('../models/Task');
const User = require('../models/User');

const getTaskCompletion = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'Completed' });

    const completionRate = ((completedTasks / totalTasks) * 100).toFixed(2);

    res.json({ totalTasks, completedTasks, completionRate });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating task completion', error: err.message });
  }
};

const getOverdueTasks = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: Date.now() },
      status: { $ne: 'Completed' },
    });

    res.json({ overdueTasks });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching overdue tasks', error: err.message });
  }
};

const getCompletedTasksPerUser = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const users = await User.find();
    const taskCompletionStats = await Promise.all(
      users.map(async (user) => {
        const completedTasks = await Task.countDocuments({ completedBy: user._id });
        return { user: user.name, completedTasks };
      })
    );

    res.json({ taskCompletionStats });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task completion per user', error: err.message });
  }
};

module.exports = { getTaskCompletion, getOverdueTasks, getCompletedTasksPerUser };
