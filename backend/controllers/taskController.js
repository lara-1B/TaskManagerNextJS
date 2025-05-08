const Task = require('../models/Task');
const User = require('../models/User');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog'); // Import the AuditLog model

// Helper to check task ownership or admin role
const checkOwnershipOrAdmin = (task, userId, userRole) => {
  if (
    task.createdBy.toString() !== userId &&
    userRole !== 'admin' &&
    !(userRole === 'manager' && task.createdBy.toString() === userId)
  ) {
    throw new Error('Unauthorized');
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, dueDate, priority, status, assignedTo } = req.body;

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy: req.user.id,
      assignedTo,
    });

    await task.save();

    // Create an audit log entry for task creation
    await AuditLog.create({
      userId: req.user.id,
      taskId: task._id,
      action: 'create',
    });

    // Send notification to the assigned user if they are not the creator
    if (assignedTo && assignedTo !== req.user.id) {
      await Notification.create({
        userId: assignedTo,
        taskId: task._id,
        title: `You have been assigned a new task: "${task.title}".`,
      });
    }

    res.status(201).json(task); // Return the created task
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// Get all tasks based on user role
const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin' || req.user.role === 'manager') {
      // Admins and managers can see all tasks
      tasks = await Task.find().populate('assignedTo', 'name');
    } else {
      // Users can only see tasks assigned to them
      tasks = await Task.find({ assignedTo: req.user.id }).populate('assignedTo', 'name');
    }
    res.json(tasks); // Return the list of tasks
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, priority, status, assignedTo } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    checkOwnershipOrAdmin(task, req.user.id, req.user.role);

    Object.assign(task, { title, description, dueDate, priority, status, assignedTo });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    checkOwnershipOrAdmin(task, req.user.id, req.user.role);

    await Task.findByIdAndDelete(taskId); // Use findByIdAndDelete instead of deleteOne
    res.json({ message: 'Task removed' }); // Return confirmation of deletion
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};

// Mark a task as complete
const markTaskComplete = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the restriction for assigned users
    task.status = 'Completed';
    task.completedBy = req.user.id;
    task.completionDate = Date.now();

    await task.save();

    // Create a notification for the task creator if someone else completed the task
    if (task.createdBy.toString() !== req.user.id.toString()) {
      await Notification.create({
        userId: task.createdBy,
        taskId: task._id,
        title: `Task "${task.title}" was completed by ${req.user.name}.`,
      });
    }

    res.json({ message: 'Task marked as complete', task });
  } catch (err) {
    res.status(500).json({ message: 'Error marking task as complete', error: err.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId).populate('assignedTo', 'name');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task', error: err.message });
  }
};

// Assign a task to a user
const assignTask = async (req, res) => {
  const { taskId } = req.params;
  const { assignedTo } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check role-based permissions
    if (req.user.role === 'admin') {
      // Admin can assign tasks to anyone
    } else if (req.user.role === 'manager') {
      // Manager can assign tasks to managers or users
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser || (assignedUser.role !== 'manager' && assignedUser.role !== 'user')) {
        return res.status(403).json({ message: 'Managers can only assign tasks to managers or users.' });
      }
    } else {
      // Users cannot assign tasks
      return res.status(403).json({ message: 'You do not have permission to assign tasks.' });
    }

    const previousAssignedTo = task.assignedTo;
    task.assignedTo = assignedTo;
    await task.save();

    // Send notification to the new assigned user
    if (assignedTo && assignedTo !== previousAssignedTo) {
      await Notification.create({
        userId: assignedTo,
        taskId: task._id,
        title: `You have been reassigned to the task: "${task.title}".`,
      });
    }

    res.json({ message: 'Task assigned successfully', task });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning task', error: err.message });
  }
};

module.exports = { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask, 
  markTaskComplete, 
  getTaskById,
  assignTask
};
