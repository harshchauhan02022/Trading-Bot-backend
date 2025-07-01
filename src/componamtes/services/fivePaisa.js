// const axios = require('axios');
// require('dotenv').config();

// const BASE_URL = 'https://openapi.5paisa.com/v1';
// const API_KEY = process.env.FIVE_PAISA_KEY;
// const API_SECRET = process.env.FIVE_PAISA_SECRET;

// // 5paisa.com API के लिए प्रमाणीकरण टोकन प्राप्त करें
// const getAuthToken = async () => {
//  const response = await axios.post(`${BASE_URL}/auth/login`, {
//   api_key: API_KEY,
//   api_secret: API_SECRET
//  });
//  return response.data.token;
// };

// module.exports = {
//  getIndicators: async (symbol, indicatorType) => {
//   try {
//    const token = await getAuthToken();
//    const response = await axios.get(`${BASE_URL}/market/indicators`, {
//     params: {
//      symbol: symbol,
//      indicator: indicatorType
//     },
//     headers: {
//      Authorization: `Bearer ${token}`
//     }
//    });
//    return response.data;
//   } catch (error) {
//    throw new Error(`5Paisa API error: ${error.message}`);
//   }
//  }
// };