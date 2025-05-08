const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify the JWT token
const verifyToken = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Decode the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user object to the request using the decoded user ID
    req.user = await User.findById(decoded.id); // This is where things might break if the user isn't found or there is no 'id' in the decoded token
    
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
