const { Strategy, Condition } = require('../models/strategy.model');
const sequelize = require('../../config/db');

module.exports = {
  getAllStrategies: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: strategies } = await Strategy.findAndCountAll({
        include: [{ model: Condition, as: 'conditions' }],
        limit,
        offset,
        order: [['created_at', 'DESC']]
      });

      return res.json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalStrategies: count,
        strategiesPerPage: limit,
        strategies
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  createStrategy: async (req, res) => {
    try {
      const {
        category, transactionType, wishlist, lot,
        orderType, limit, userId
      } = req.body;

      // ✅ Log each variable to debug the issue
      console.log('Received values:', {
        category, transactionType, wishlist, lot, orderType, limit, userId
      });

      if (!category || !transactionType || !wishlist || !lot || !orderType || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newStrategy = await Strategy.create({
        categoryId: category,
        transaction_type: transactionType,
        wishlist,
        lot,
        order_type: orderType,
        entry_limit: limit,
        userId
      });

      res.status(201).json(newStrategy);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  createManualStrategy: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        selected_category, wishlist, order_type, entry_limit,
        transaction_type, entry_time_frame, entry_condition,
        exit_type, exit_limit, exit_time_frame, exit_condition,
        lot, userId
      } = req.body;

      // Log request body for debugging
      // console.log('Incoming request body:', req.body);

      // Validate required fields
      const missingFields = [];
      if (!selected_category) missingFields.push('selected_category');
      if (!wishlist) missingFields.push('wishlist');
      if (!order_type) missingFields.push('order_type');
      if (!transaction_type) missingFields.push('transaction_type');
      if (!userId) missingFields.push('userId');

      if (missingFields.length > 0) {
        return res.status(400).json({ error: `Required fields are missing: ${missingFields.join(', ')}` });
      }

      // Create Strategy
      const strategy = await Strategy.create({
        userId,
        categoryId: selected_category,
        wishlist,
        order_type: order_type,
        entry_limit,
        transaction_type: transaction_type,
        exit_limit,
        name: 'Manual Strategy',
        type: 'custom',
        parameters: {},
        lot
      }, { transaction });

      // Insert Entry Conditions
      for (const [index, condition] of entry_condition.entries()) {
        await Condition.create({
          strategyId: strategy.id,
          condition_type: 'entry',
          time_frame: entry_time_frame,
          limit_value: entry_limit,
          long_indicator1: condition.longCondition.indicator1,
          long_comparator: condition.longCondition.comparator,
          long_indicator2: condition.longCondition.indicator2,
          short_indicator1: condition.shortCondition.indicator1,
          short_comparator: condition.shortCondition.comparator,
          short_indicator2: condition.shortCondition.indicator2,
          logical_operator: condition.logicalOperator,
          condition_order: index
        }, { transaction });
      }

      // Insert Exit Conditions
      for (const [index, condition] of exit_condition.entries()) {
        await Condition.create({
          strategyId: strategy.id,
          condition_type: 'exit',
          time_frame: exit_time_frame,
          limit_value: exit_limit,
          exit_type,
          long_indicator1: condition.longCondition.indicator1,
          long_comparator: condition.longCondition.comparator,
          long_indicator2: condition.longCondition.indicator2,
          short_indicator1: condition.shortCondition.indicator1,
          short_comparator: condition.shortCondition.comparator,
          short_indicator2: condition.shortCondition.indicator2,
          logical_operator: condition.logicalOperator,
          condition_order: index
        }, { transaction });
      }

      await transaction.commit();

      const fullStrategy = await Strategy.findByPk(strategy.id, {
        include: [{ model: Condition, as: 'conditions' }]
      });

      return res.status(201).json({ success: true, data: fullStrategy });

    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ error: error.message });
    }
  }

};
