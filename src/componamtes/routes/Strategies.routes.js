const express = require('express');
const router = express.Router();
const strategyController = require('../controllers/strategy.controller');

router.get('/', strategyController.getAllStrategies);
router.post('/', strategyController.createStrategy);
router.post('/manual', strategyController.createManualStrategy);

module.exports = router;