const express = require('express');
const { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask, 
  markTaskComplete, 
  getTaskById,
  assignTask
} = require('../controllers/taskController');
const { verifyTokenAndAdmin, verifyTokenAndManager, verifyTokenAndUser } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Create task
router.post('/', verifyTokenAndManager, createTask);

// Get tasks
router.get('/', verifyTokenAndUser, getTasks);

// Get a task by ID
router.get('/:taskId', verifyTokenAndManager, getTaskById);

// Update task
router.put('/:taskId', verifyTokenAndManager, updateTask);

// Mark task as complete
router.put('/:taskId/complete', verifyTokenAndUser, markTaskComplete);

// Assign task to a user
router.put('/assign/:taskId', verifyTokenAndManager, assignTask);

// Delete task
router.delete('/:taskId', verifyTokenAndManager, deleteTask);

module.exports = router;
