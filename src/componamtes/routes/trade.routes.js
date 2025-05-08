const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/trade.controller');

router.post('/trades', tradeController.createTrade);
router.get('/trades', tradeController.getAllTrades);
router.get('/trades/:id', tradeController.getTradeById);
router.put('/trades/:id', tradeController.updateTrade);
router.delete('/trades/:id', tradeController.deleteTrade);

module.exports = router;
