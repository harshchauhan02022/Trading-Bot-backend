const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const User = sequelize.define('User', {
  full_name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: DataTypes.STRING,
  mobile_number: DataTypes.STRING,
  address: DataTypes.STRING,
  registration_date: DataTypes.DATE,
  trading_categories: DataTypes.STRING,
  gender: DataTypes.STRING,
  state: DataTypes.STRING,
  broker: DataTypes.STRING,
  refer_id: DataTypes.STRING,
  exness_broker_id: DataTypes.STRING,
  app_name: DataTypes.STRING,
  api_key: DataTypes.STRING,
  api_secret_key: DataTypes.STRING,
  aadhar_front: DataTypes.STRING,
  aadhar_back: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('new', 'awaiting', 'blocked'),
    defaultValue: 'new',
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = User;
