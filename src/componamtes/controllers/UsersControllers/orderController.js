const Order = require('../../models/UsersModels/order.model');

exports.getUserOrders = async (req, res) => {
 try {
  const userId = req.user?.id;

  if (!userId) {
   return res.status(401).json({ error: 'Unauthorized: User not found in request' });
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
