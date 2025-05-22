const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/trade.controller');
const authMiddleware = require('../utils/authMiddleware');

router.post('/trades', authMiddleware, tradeController.createTrade);
router.get('/trades', authMiddleware, tradeController.getUserTrades);
router.get('/trades/:id', authMiddleware, tradeController.getTradeById);
router.put('/trades/:id', authMiddleware, tradeController.updateTrade);
router.delete('/trades/:id', authMiddleware, tradeController.deleteTrade);

module.exports = router;
