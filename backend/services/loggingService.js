const AuditLog = require('../models/AuditLog');

// Generalized log function
const logAction = async (userId, taskId, action) => {
  try {
    const log = new AuditLog({ userId, taskId, action });
    await log.save();
  } catch (err) {
    console.error('Error logging action:', err);
  }
};

module.exports = { logAction };
