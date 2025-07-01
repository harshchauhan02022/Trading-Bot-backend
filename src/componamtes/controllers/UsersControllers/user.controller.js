const User = require('../../models/UsersModels/user.model');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const {
      full_name, email, password, mobile_number, address,
      registration_date, trading_categories, gender, state,
      broker, refer_id, exness_broker_id, app_name,
      api_key, api_secret_key
    } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password only if it's provided
    let hashedPassword = null;
    if (password && password.trim() !== '') {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Handle file uploads
    const aadharFront = req.files?.aadhar_front?.[0]?.filename || null;
    const aadharBack = req.files?.aadhar_back?.[0]?.filename || null;

    // Create user with or without password
    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      mobile_number,
      address,
      registration_date,
      trading_categories,
      gender,
      state,
      broker,
      refer_id,
      exness_broker_id,
      app_name,
      api_key,
      api_secret_key,
      aadhar_front: aadharFront,
      aadhar_back: aadharBack
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const MAX_LIMIT = 100;
    if (limit > MAX_LIMIT) {
      return res.status(400).json({
        success: false,
        message: `Limit cannot exceed ${MAX_LIMIT}`
      });
    }

    const { count, rows: users } = await User.findAndCountAll({
      order: [['created_At', 'DESC']],
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: count,
      usersPerPage: limit,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(req.body);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

exports.getAwaitingApprovals = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'awaiting' },
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      message: 'Awaiting approvals fetched successfully',
      users
    });
  } catch (err) {
    console.error('Error fetching awaiting approvals:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching awaiting approvals',
      error: err.message
    });
  }
};

exports.getBlockedUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'blocked' },
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      message: 'Blocked users fetched successfully',
      users
    });
  } catch (err) {
    console.error('Error fetching blocked users:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching blocked users',
      error: err.message
    });
  }
};
