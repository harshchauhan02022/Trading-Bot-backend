const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Register/Create
exports.createUser = async (req, res) => {
  try {
    const {
      full_name, email, password, mobile_number, address,
      registration_date, trading_categories, gender, state,
      broker, refer_id, exness_broker_id, app_name,
      api_key, api_secret_key
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const aadharFront = req.files?.aadhar_front?.[0]?.filename || null;
    const aadharBack = req.files?.aadhar_back?.[0]?.filename || null;

    const user = await User.create({
      full_name, email, password: hashedPassword, mobile_number, address,
      registration_date, trading_categories, gender, state,
      broker, refer_id, exness_broker_id, app_name,
      api_key, api_secret_key,
      aadhar_front: aadharFront,
      aadhar_back: aadharBack
    });

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Get all
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Get by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) res.status(200).json(user);
    else res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(req.body);
    res.status(200).json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
