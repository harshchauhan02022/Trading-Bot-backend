const express = require('express');
const router = express.Router();
const marketController = require('../controllers/market.controller');

router.get('/price/:symbol', marketController.getRealTimePrice);
router.get('/historical/:symbol', marketController.getHistoricalData);
router.get('/indicators/:symbol', marketController.getTechnicalIndicators);

module.exports = router;