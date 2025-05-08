const Trade = require('../models/trade.model');

// Create new trade
exports.createTrade = async (req, res) => {
  try {
    const { user_id, stock_symbol, trade_type, quantity, price } = req.body;

    if (!['buy', 'sell'].includes(trade_type)) {
      return res.status(400).json({ message: 'Invalid trade type' });
    }

    const trade = await Trade.create({
      user_id,
      stock_symbol,
      trade_type,
      quantity,
      price,
    });

    res.status(201).json({ message: 'Trade created successfully', trade });
  } catch (error) {
    res.status(500).json({ message: 'Error creating trade', error: error.message });
  }
};

// Get all trades
exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.findAll();
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trades', error: error.message });
  }
};

// Get trade by ID
exports.getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findByPk(req.params.id);
    if (trade) res.status(200).json(trade);
    else res.status(404).json({ message: 'Trade not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trade', error: error.message });
  }
};

// Update trade
exports.updateTrade = async (req, res) => {
  try {
    const { stock_symbol, trade_type, quantity, price } = req.body;
    const trade = await Trade.findByPk(req.params.id);
    if (trade) {
      await trade.update({ stock_symbol, trade_type, quantity, price });
      res.status(200).json({ message: 'Trade updated successfully', trade });
    } else res.status(404).json({ message: 'Trade not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trade', error: error.message });
  }
};

// Delete trade
exports.deleteTrade = async (req, res) => {
  try {
    const trade = await Trade.findByPk(req.params.id);
    if (trade) {
      await trade.destroy();
      res.status(200).json({ message: 'Trade deleted successfully' });
    } else res.status(404).json({ message: 'Trade not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trade', error: error.message });
  }
};
