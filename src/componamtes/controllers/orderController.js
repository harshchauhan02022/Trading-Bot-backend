const Order = require('../models/order.model');
const { Op } = require('sequelize');

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereCondition = {};
    if (userId) whereCondition.user_id = userId;

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereCondition,
      order: [['order_date', 'DESC']],
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      currentPage: page,
      totalPages,
      totalOrders: count,
      ordersPerPage: limit,
      orders
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.getOrdersByCategory = async (req, res) => {
 try {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows: orders } = await Order.findAndCountAll({
   where: { category_id: categoryId },
   order: [['order_date', 'DESC']],
   limit: limit,
   offset: offset
  });

  const totalPages = Math.ceil(count / limit);

  res.json({
   success: true,
   currentPage: page,
   totalPages: totalPages,
   totalOrders: count,
   ordersPerPage: limit,
   orders: orders
  });
 } catch (error) {
  console.error("Error fetching orders by category:", error);
  res.status(500).json({ error: 'Failed to fetch orders by category' });
 }
};

exports.getOrdersByMultipleCategories = async (req, res) => {
 try {
  const { ids } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  if (!ids) {
   return res.status(400).json({ error: 'Category IDs are required' });
  }

  const categoryIds = ids.split(',').map(id => parseInt(id.trim()));

  const { count, rows: orders } = await Order.findAndCountAll({
   where: {
    category_id: {
     [Op.in]: categoryIds
    }
   },
   order: [['order_date', 'DESC']],
   limit: limit,
   offset: offset
  });

  const totalPages = Math.ceil(count / limit);

  res.json({
   success: true,
   currentPage: page,
   totalPages: totalPages,
   totalOrders: count,
   ordersPerPage: limit,
   orders: orders
  });
 } catch (error) {
  console.error("Error fetching orders by categories:", error);
  res.status(500).json({ error: 'Failed to fetch orders by categories' });
 }
};
