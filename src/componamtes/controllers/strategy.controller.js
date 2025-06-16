const Strategy = require('../models/strategy.model');

module.exports = {
 getAllStrategies: async (req, res) => {
  try {
   const strategies = await Strategy.findAll();
   res.json(strategies);
  } catch (err) {
   res.status(500).json({ error: err.message });
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
