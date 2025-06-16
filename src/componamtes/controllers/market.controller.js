const alphaVantage = require('../services/alphaVantage');
const fivePaisa = require('../services/fivePaisa');
const { Indicator } = require('../models/indicator.model');

module.exports = {
 getRealTimePrice: async (req, res) => {
  try {
   const { symbol } = req.params;
   const priceData = await alphaVantage.getRealTimePrice(symbol);

   res.json({
    symbol,
    price: priceData['05. price'],
    change: priceData['09. change'],
    changePercent: priceData['10. change percent']
   });
  } catch (error) {
   res.status(500).json({
    error: `Error : ${error.message}`
   });
  }
 },

 getHistoricalData: async (req, res) => {
  try {
   const { symbol } = req.params;
   const { interval } = req.query;

   const historicalData = await alphaVantage.getHistoricalData(symbol, interval);

   const formattedData = Object.entries(historicalData).map(([date, values]) => ({
    date,
    open: values['1. open'],
    high: values['2. high'],
    low: values['3. low'],
    close: values['4. close'],
    volume: values['5. volume']
   }));

   res.json(formattedData);
  } catch (error) {
   res.status(500).json({
    error: `Error: ${error.message}`
   });
  }
 },

 getTechnicalIndicators: async (req, res) => {
  try {
   const { symbol } = req.params;
   const { type = 'rsi', timeframe = '1d' } = req.query;

   const cachedIndicator = await Indicator.findOne({
    where: { symbol, type, timeframe }
   });

   if (cachedIndicator) {
    return res.json(cachedIndicator.value);
   }

   let indicatorData;
   if (symbol.endsWith('.NS')) {
    indicatorData = await fivePaisa.getIndicators(symbol, type);
   } else {
   }

   await Indicator.create({
    symbol,
    type,
    timeframe,
    value: indicatorData
   });

   res.json(indicatorData); 
  } catch (error) {
   res.status(500).json({
    error: `Error: ${error.message}`
   });
  }
 }
};