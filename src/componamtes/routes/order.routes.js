const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const authenticate = require('../utils/authMiddleware');

router.get('/order', authenticate, OrderController.getUserOrders);

router.get('/orders/category/:categoryId', OrderController.getOrdersByCategory);

router.get('/orders/categories', OrderController.getOrdersByMultipleCategories);

module.exports = router;
