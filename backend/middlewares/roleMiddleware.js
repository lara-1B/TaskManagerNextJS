const { verifyToken } = require('./authMiddleware');

const verifyRole = (allowedRoles) => async (req, res, next) => {
  try {
    await verifyToken(req, res, () => {});
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied. Allowed roles: ${allowedRoles.join(', ')}` });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

const verifyTokenAndAdmin = verifyRole(['admin']);
const verifyTokenAndManager = verifyRole(['manager', 'admin']);
const verifyTokenAndUser = verifyRole(['user', 'manager', 'admin']);

const verifyTokenAndAdminOrManager = async (req, res, next) => {
  try {
    await verifyToken(req, res, () => {}); // Ensure token is verified
    if (req.user.role === 'admin' || req.user.role === 'manager') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins or Managers only.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying token or role', error: error.message });
  }
};

module.exports = { verifyTokenAndAdmin, verifyTokenAndManager, verifyTokenAndUser, verifyTokenAndAdminOrManager };
