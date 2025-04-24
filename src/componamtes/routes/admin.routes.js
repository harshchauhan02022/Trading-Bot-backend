const express = require('express');
const router = express.Router();
const authController = require('../controllers/admin.controller');

router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;
