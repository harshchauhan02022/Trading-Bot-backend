const Order = require('../models/order.model');
const { Op } = require('sequelize');

exports.getUserOrders = async (req, res) => {
 try {
  const userId = req.query.user_id;

  if (!userId) {
   return res.status(400).json({ error: 'User ID is required' });
  }

  const orders = await Order.findAll({
   where: { user_id: userId },
   order: [['order_date', 'DESC']],
  });

  res.json(orders);
 } catch (error) {
  console.error("Error fetching user orders:", error);
  res.status(500).json({ error: 'Failed to fetch orders' });
 }
};


exports.getOrdersByCategory = async (req, res) => {
 try {
  const { categoryId } = req.params;

  const orders = await Order.findAll({
   where: {
    category_id: categoryId
   },
   order: [['order_date', 'DESC']],
  });

  res.json(orders);
 } catch (error) {
  console.error("Error fetching orders by category:", error);
  res.status(500).json({ error: 'Failed to fetch orders by category' });
 }
};

// ✅ Orders by multiple categories
exports.getOrdersByMultipleCategories = async (req, res) => {
 try {
  const { ids } = req.query;

  if (!ids) {
   return res.status(400).json({ error: 'Category IDs are required' });
  }

  const categoryIds = ids.split(',').map(id => parseInt(id.trim()));

  const orders = await Order.findAll({
   where: {
    category_id: {
     [Op.in]: categoryIds
    }
   },
   order: [['order_date', 'DESC']],
  });

  res.json(orders);
 } catch (error) {
  console.error("Error fetching orders by categories:", error);
  res.status(500).json({ error: 'Failed to fetch orders by categories' });
 }
};
