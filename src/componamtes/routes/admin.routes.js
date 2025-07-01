const express = require('express');
const router = express.Router();
const auth = require('../controllers/admin.controller');

router.post('/send-otp', auth.sendOTP);
router.post('/verify-otp', auth.verifyOTP);

module.exports = router;
