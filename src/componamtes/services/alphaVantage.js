// const axios = require('axios');
// require('dotenv').config();

// const API_KEY = process.env.ALPHA_VANTAGE_KEY;
// const BASE_URL = 'https://www.alphavantage.co/query';

// module.exports = {
//  getRealTimePrice: async (symbol) => {
//   try {
//    const response = await axios.get(BASE_URL, {
//     params: {
//      function: 'GLOBAL_QUOTE',
//      symbol: symbol,
//      apikey: API_KEY
//     }
//    });
//    return response.data['Global Quote'];
//   } catch (error) {
//    throw new Error(`AlphaVantage API error: ${error.message}`);
//   }
//  },

//  getHistoricalData: async (symbol, interval = 'daily') => {
//   try {
//    const response = await axios.get(BASE_URL, {
//     params: {
//      function: 'TIME_SERIES_DAILY',
//      symbol: symbol,
//      outputsize: 'compact',
//      apikey: API_KEY
//     }
//    });
//    return response.data['Time Series (Daily)'];
//   } catch (error) {
//    throw new Error(`AlphaVantage historical data error: ${error.message}`);
//   }
//  }
// };