const { Category, User } = require("../models/category.model");

exports.addCategory = async (req, res) => {
  try {
    const { name, trading_amount } = req.body;
    const category = await Category.create({ name, trading_amount });
    res.json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Category,
        attributes: ['id', 'name', 'trading_amount']
      }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersByAmount = async (req, res) => {
  try {
    const amount = req.params.amount;
    const users = await User.findAll({
      where: { trading_amount: amount },
      include: {
        model: Category,
        attributes: ['id', 'name', 'trading_amount']
      }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
