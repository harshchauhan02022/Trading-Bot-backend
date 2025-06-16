const Category = require('../models/category.model');

// Create a new category
exports.create = async (req, res) => {
  try {
    const { categories_name, trading_amount } = req.body;

    const category = await Category.create({
      categories_name,
      trading_amount: parseInt(trading_amount),
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Retrieve all categories
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a category by ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { categories_name, trading_amount } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.categories_name = categories_name || category.categories_name;
    category.trading_amount = trading_amount ? parseInt(trading_amount) : category.trading_amount;

    await category.save();

    res.json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a category by ID
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
