const TrackHistory = require('../../models/trade.model');
const Category = require('../../models/category.model');

exports.getTradeHistoryByCategory = async (req, res) => {
 try {
  const { userId } = req.params;
  const { categoryId } = req.query;

  const history = await TrackHistory.findAll({
   where: {
    userId,
    categoryId,
   },
   include: [{
    model: Category,
    attributes: ['categories_name', 'trading_amount'],
   }],
  });

  res.json(history);
 } catch (error) {
  console.error('Error fetching trade history:', error);
  res.status(500).json({ error: 'Failed to fetch trade history' });
 }
};
