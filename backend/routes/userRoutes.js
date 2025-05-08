const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getAllUsers, 
  updateUserRole, 
  deleteUser 
} = require('../controllers/userController');
const { verifyTokenAndAdminOrManager, verifyTokenAndAdmin } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get all users (Admin and Manager)
router.get('/', verifyTokenAndAdminOrManager, getAllUsers);

// Update user role (Admin only)
router.put('/:id/role', verifyTokenAndAdmin, updateUserRole);

// Delete user (Admin only)
router.delete('/:id', verifyTokenAndAdmin, deleteUser);

module.exports = router;
