const express = require('express');
const { 
  getTaskCompletion, 
  getOverdueTasks, 
  getCompletedTasksPerUser 
} = require('../controllers/analyticsController');
const { verifyTokenAndAdmin } = require('../middlewares/roleMiddleware');

const router = express.Router();

// GET /api/analytics/task-completion
router.get('/task-completion', verifyTokenAndAdmin, getTaskCompletion);

// GET /api/analytics/overdue-tasks
router.get('/overdue-tasks', verifyTokenAndAdmin, getOverdueTasks);

// GET /api/analytics/completed-tasks-per-user
router.get('/completed-tasks-per-user', verifyTokenAndAdmin, getCompletedTasksPerUser);

module.exports = router;
