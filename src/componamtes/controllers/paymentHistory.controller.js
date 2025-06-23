const PaymentHistory = require('../models/PaymentHistory.model');

module.exports = {
 getAllPayments: async (req, res) => {
  try {
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   const offset = (page - 1) * limit;

   const { count, rows } = await PaymentHistory.findAndCountAll({
    limit,
    offset,
    order: [['created_at', 'DESC']]
   });

   return res.json({
    success: true,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalRecords: count,
    payments: rows
   });
  } catch (err) {
   return res.status(500).json({
    success: false,
    error: err.message
   });
  }
 },

 getPaymentsByUser: async (req, res) => {
  try {
   const { userId } = req.params;

   const payments = await PaymentHistory.findAll({
    where: { userId },
    order: [['created_at', 'DESC']]
   });

   return res.json({
    success: true,
    userId,
    totalRecords: payments.length,
    payments
   });
  } catch (err) {
   return res.status(500).json({ success: false, error: err.message });
  }
 },

 createPayment: async (req, res) => {
  try {
   const { userId, amount, paymentMethod, transactionId, status } = req.body;

   if (!userId || !amount || !paymentMethod) {
    return res.status(400).json({
     success: false,
     error: 'userId, amount, and paymentMethod are required'
    });
   }

   const payment = await PaymentHistory.create({
    userId,
    amount,
    paymentMethod,
    status: status || 'pending',
    transactionId
   });

   return res.status(201).json({ success: true, data: payment });
  } catch (err) {
   return res.status(500).json({ success: false, error: err.message });
  }
 }
};
