const PaymentHistory = require('../models/PaymentHistory.model');
const Category = require('../models/category.model');
const { sequelize } = require('../models/PaymentHistory.model');


exports.getPaymentsByCategoryId = async (req, res) => {
 try {
  const { id: categoryId } = req.params;

  const payments = await PaymentHistory.findAll({
   where: { categoryId },
   include: [{ model: Category, as: 'category' }],
   order: [['created_at', 'DESC']]
  });

  res.json({
   success: true,
   categoryId: parseInt(categoryId),
   payments
  });
 } catch (err) {
  res.status(500).json({ success: false, error: err.message });
 }
};
exports.getTotalPaymentsByCategory = async (req, res) => {
 try {
  const { categoryId } = req.params;
  const count = await PaymentHistory.count({ where: { categoryId } });
  res.json({ success: true, totalPayments: count });
 } catch (err) {
  res.status(500).json({ success: false, error: err.message });
 }
};
exports.createPayment = async (req, res) => {
 try {
  const {
   categoryId,
   date,
   name,
   contact,
   symbol,
   transaction,
   trading_amount,
   margin,
   profit,
   profit_share,
   payment_status
  } = req.body;

  if (!categoryId || !date || !name || !contact || !symbol || !transaction || !trading_amount) {
   return res.status(400).json({
    success: false,
    error: 'Missing required fields'
   });
  }

  const category = await Category.findByPk(categoryId);
  if (!category) {
   return res.status(400).json({
    success: false,
    error: 'Invalid categoryId'
   });
  }

  const newPayment = await PaymentHistory.create({
   categoryId,
   date,
   name,
   contact,
   symbol,
   transaction,
   trading_amount,
   margin,
   profit,
   profit_share,
   payment_status
  });

  return res.status(201).json({ success: true, data: newPayment });

 } catch (err) {
  return res.status(500).json({ success: false, error: err.message });
 }
};
exports.getAllPaymentsSummary = async (req, res) => {
 try {
  const payments = await PaymentHistory.findAll({
   include: [{ model: Category, as: 'category' }],
   order: [['created_at', 'DESC']],
  });

  res.json({
   success: true,
   totalPayments: payments.length,
   payments
  });
 } catch (err) {
  res.status(500).json({ success: false, error: err.message });
 }
};
