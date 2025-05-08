const express = require('express');
const { getAuditLogs } = require('../controllers/auditLogController');
const { verifyTokenAndAdmin } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Get all audit logs with optional filters (admin only)
router.get('/', verifyTokenAndAdmin, getAuditLogs);

module.exports = router;
