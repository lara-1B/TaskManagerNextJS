const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields: name, email, password, and role' });
  }

  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5h' });
    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get all users (Admin and Manager only)
const getAllUsers = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'manager') {
      query.role = { $ne: 'admin' }; // Exclude admins for managers
    }

    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error.message); // Log the error
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Update user role (Admin only)
const updateUserRole = async (req, res) => {
  const { role } = req.body;

  if (!role || !['admin', 'manager', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid or missing role' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error });
  }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
