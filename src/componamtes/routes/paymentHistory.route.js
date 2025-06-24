const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentHistory.controller');

router.get('/payments/all', paymentController.getAllPayments);
router.get('/category/:categoryId', paymentController.getPaymentsByCategory);
router.post('/payments', paymentController.createPayment);

module.exports = router;
