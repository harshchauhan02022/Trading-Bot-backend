const Trade = require('../models/trade.model');
const { Op } = require('sequelize');

exports.createTrade = async (req, res) => {
  try {
    const { trade_date, trade_time, symbol, transaction_type, margin, loss, profit, notes, category_id, user_id } = req.body;

    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const trade = await Trade.create({
      user_id,
      trade_date,
      trade_time,
      symbol,
      transaction_type,
      margin,
      loss,
      profit,
      notes,
      category_id
    });

    res.status(201).json(trade);
  } catch (error) {
    res.status(500).json({ error: 'Trade creation failed', details: error.message });
  }
};

exports.getUserTrades = async (req, res) => {
  try {
    const { user_id } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const MAX_LIMIT = 100;
    if (limit > MAX_LIMIT) {
      return res.status(400).json({
        error: `Limit cannot exceed ${MAX_LIMIT}`
      });
    }

    const { count, rows: trades } = await Trade.findAndCountAll({
      where: { user_id },
      order: [['trade_date', 'DESC']],
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalTrades: count,
      tradesPerPage: limit,
      trades: trades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trades',
      details: error.message
    });
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.query;

    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const trade = await Trade.findOne({ where: { id, user_id } });

    if (!trade) return res.status(404).json({ error: 'Trade not found' });

    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trade' });
  }
};

exports.updateTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const trade = await Trade.findOne({ where: { id, user_id } });

    if (!trade) return res.status(404).json({ error: 'Trade not found' });

    await trade.update(req.body);
    res.json({ message: 'Trade updated successfully', trade });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trade' });
  }
};

exports.deleteTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.query;

    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const trade = await Trade.findOne({ where: { id, user_id } });

    if (!trade) return res.status(404).json({ error: 'Trade not found' });

    await trade.destroy();
    res.json({ message: 'Trade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trade' });
  }
};

exports.getTradesByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const MAX_LIMIT = 100;
    if (limit > MAX_LIMIT) {
      return res.status(400).json({
        error: `Limit cannot exceed ${MAX_LIMIT}`
      });
    }

    const { count, rows: trades } = await Trade.findAndCountAll({
      where: { category_id },
      order: [['trade_date', 'DESC']],
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalTrades: count,
      tradesPerPage: limit,
      trades: trades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trades by category',
      details: error.message
    });
  }
};

exports.getTradesByMultipleCategories = async (req, res) => {
  try {
    const { ids } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    if (!ids) {
      return res.status(400).json({
        success: false,
        error: 'Category IDs are required'
      });
    }

    const MAX_LIMIT = 100;
    if (limit > MAX_LIMIT) {
      return res.status(400).json({
        success: false,
        error: `Limit cannot exceed ${MAX_LIMIT}`
      });
    }

    const categoryIds = ids.split(',').map(id => parseInt(id.trim()));

    const { count, rows: trades } = await Trade.findAndCountAll({
      where: {
        category_id: {
          [Op.in]: categoryIds
        }
      },
      order: [['trade_date', 'DESC']],
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalTrades: count,
      tradesPerPage: limit,
      trades: trades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trades by categories',
      details: error.message
    });
  }
};
//   try {
//     const { ids } = req.query;

//     if (!ids) {
//       return res.status(400).json({ error: 'Category IDs are required' });
//     }

//     const categoryIds = ids.split(',').map(id => parseInt(id.trim()));

//     const trades = await Trade.findAll({
//       where: {
//         category_id: {
//           [Op.in]: categoryIds
//         }
//       },
//       order: [['trade_date', 'DESC']],
//     });

//     res.json(trades);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch trades by categories', details: error.message });
//   }
// };