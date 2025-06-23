const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentHistory.controller');


router.get('/all', paymentController.getAllPayments);
router.get('/:userId', paymentController.getPaymentsByUser);
router.post('/', paymentController.createPayment);

module.exports = router;
 