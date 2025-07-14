const Category = require('../models/category.model');

function getCategoryName(amount) {
  if (amount >= 200 && amount < 500) return '200 Dollar';
  if (amount >= 500 && amount < 1000) return '500 Dollar';
  if (amount >= 1000 && amount < 1500) return '1000 Dollar';
  if (amount >= 1500 && amount < 2000) return '1500 Dollar';
  if (amount >= 2000 && amount < 5000) return '2000 Dollar';
  if (amount >= 5000) return '5000 Dollar';
  return null;
} 

// Create Category
exports.create = async (req, res) => {
  try {
    const { trading_amount } = req.body;

    if (!trading_amount) {
      return res.status(400).json({ message: "trading_amount is required" });
    }

    const amount = parseInt(trading_amount);
    if (isNaN(amount)) {
      return res.status(400).json({ message: "Invalid trading amount" });
    }

    const categories_name = getCategoryName(amount);
    if (!categories_name) {
      return res.status(400).json({ message: "Invalid trading amount range" });
    }

    const category = await Category.create({
      categories_name,
      trading_amount: amount
    });

    res.status(201).json(category);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Categories
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Category
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { trading_amount } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (trading_amount) {
      const amount = parseInt(trading_amount);
      const categories_name = getCategoryName(amount);

      if (!categories_name) {
        return res.status(400).json({ message: "Invalid trading amount range" });
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

// Delete Category
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
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
