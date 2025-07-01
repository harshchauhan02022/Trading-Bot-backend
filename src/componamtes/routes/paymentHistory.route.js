const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentHistory.controller');

router.post('/payments', paymentController.createPayment);
router.get('/category/:id', paymentController.getPaymentsByCategoryId);
router.get('/category/:categoryId/total-payments', paymentController.getTotalPaymentsByCategory);
router.get('/payments/summary', paymentController.getAllPaymentsSummary);


module.exports = router;
