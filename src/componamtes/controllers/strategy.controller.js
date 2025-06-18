const Strategy = require('../models/strategy.model');

module.exports = {
  getAllStrategies: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const MAX_LIMIT = 100;
      if (limit > MAX_LIMIT) {
        return res.status(400).json({
          success: false,
          error: `Limit cannot exceed ${MAX_LIMIT}`
        });
      }

      const { count, rows: strategies } = await Strategy.findAndCountAll({
        limit: limit,
        offset: offset
      });
      const totalPages = Math.ceil(count / limit);

      res.json({
        success: true,
        currentPage: page,
        totalPages: totalPages,
        totalStrategies: count,
        strategiesPerPage: limit,
        strategies: strategies
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  },
  createStrategy: async (req, res) => {
    try {
      const newStrategy = await Strategy.create(req.body);
      res.status(201).json(newStrategy);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  createManualStrategy: async (req, res) => {
    try {
      const {
        category,
        transactionType,
        wishlist,
        lot,
        orderType,
        limit,
        userId
      } = req.body;

      const strategy = await Strategy.create({
        category,
        transactionType,
        wishlist,
        lot,
        orderType,
        limit,
        userId
      });

      return res.status(201).json({ success: true, data: strategy });
    } catch (error) {
      console.error('Error creating strategy:', error);
      return res.status(500).json({ error: error.message });  // Show actual error
    }
  },
};
