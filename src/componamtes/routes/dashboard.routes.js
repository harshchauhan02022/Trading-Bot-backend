const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/full_data', dashboardController.getFullDashboardData);

router.get('/summary', dashboardController.getDashboardData);

module.exports = router;