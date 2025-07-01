const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const authenticate = require('../../middleware/authenticate');

router.get('/order', OrderController.getUserOrders);

router.get('/orders/category/:categoryId', OrderController.getOrdersByCategory);

router.get('/orders/categories', OrderController.getOrdersByMultipleCategories);

module.exports = router;
