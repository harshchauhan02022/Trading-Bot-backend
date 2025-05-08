const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

// Define routes
router.get('/new-users', dashboardController.getNewUsers);
router.get('/blocked-users', dashboardController.getBlockedUsers);
router.get('/awaiting-users', dashboardController.getAwaitingUsers);
router.get('/total-trades', dashboardController.getTotalTrades);
router.get('/target-trades', dashboardController.getTargetTrades);
router.get('/stophunt-trades', dashboardController.getStopHuntTrades);
router.get('/total-users', dashboardController.getTotalUsers);
router.get('/total-profit', dashboardController.getTotalProfit);

module.exports = router;
