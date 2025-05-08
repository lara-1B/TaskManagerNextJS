const express = require('express');
const { 
  getNotifications, 
  markNotificationAsRead 
} = require('../controllers/notificationController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get notifications for the logged-in user
router.get('/', verifyToken, getNotifications);

// Mark a notification as read
router.put('/:id/read', verifyToken, markNotificationAsRead);

module.exports = router;
