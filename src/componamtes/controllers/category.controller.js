const Category = require('../models/category.model');

exports.create = async (req, res) => {
  try {
    const { trading_amount } = req.body;
    const amount = parseInt(trading_amount);

    let categories_name = '';

    if (amount >= 200 && amount < 500) {
      categories_name = '200 Dollar';
    } else if (amount >= 500 && amount < 1000) {
      categories_name = '500 Dollar';
    } else if (amount >= 1000 && amount < 1500) {
      categories_name = '1000 Dollar';
    } else if (amount >= 1500) {
      categories_name = '1500 Dollar';
    } else {
      return res.status(400).json({ message: "Invalid trading amount" });
    }

    const category = await Category.create({
      categories_name,
      trading_amount: amount
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { trading_amount } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    let categories_name = category.categories_name;
    if (trading_amount) {
      const amount = parseInt(trading_amount);
      if (amount >= 200 && amount < 500) {
        categories_name = '200 Dollar';
      } else if (amount >= 500 && amount < 1000) {
        categories_name = '500 Dollar';
      } else if (amount >= 1000 && amount < 1500) {
        categories_name = '1000 Dollar';
      } else if (amount >= 1500) {
        categories_name = '1500 Dollar';
      } else {
        return res.status(400).json({ message: "Invalid trading amount" });
      }

      category.trading_amount = amount;
      category.categories_name = categories_name;
    }

    await category.save();

    res.json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
