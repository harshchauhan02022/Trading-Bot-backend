const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/new_users', dashboardController.getNewUsers);
router.get('/blocked_users', dashboardController.getBlockedUsers);
router.get('/full_data', dashboardController.getFullDashboardData);

module.exports = router;