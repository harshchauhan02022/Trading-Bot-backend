const Trade = require('../models/trade.model');

exports.createTrade = async (req, res) => {
  try {
    const { trade_date, trade_time, symbol, transaction_type, margin, loss, profit, notes } = req.body;
    const trade = await Trade.create({
      user_id: req.user.id,
      trade_date,
      trade_time,
      symbol,
      transaction_type,
      margin,
      loss,
      profit,
      notes,
    });
    res.status(201).json(trade);
  } catch (error) {
    res.status(500).json({ error: 'Trade creation failed' });
  }
};

exports.getUserTrades = async (req, res) => {
  try {
    const trades = await Trade.findAll({
      where: { user_id: req.user.id },
      order: [['trade_date', 'DESC']],
    });
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const { id } = req.params;
    const trade = await Trade.findOne({ where: { id, user_id: req.user.id } });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trade' });
  }
};

exports.updateTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const trade = await Trade.findOne({ where: { id, user_id: req.user.id } });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    await trade.update(req.body);
    res.json({ message: 'Trade updated successfully', trade });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trade' });
  }
};

exports.deleteTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const trade = await Trade.findOne({ where: { id, user_id: req.user.id } });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    await trade.destroy();
    res.json({ message: 'Trade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trade' });
  }
};
