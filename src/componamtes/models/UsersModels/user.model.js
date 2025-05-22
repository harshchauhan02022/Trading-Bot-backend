const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Referral = require('./referral.model');
// const { User, Referral } = require('../../models/index');

const User = sequelize.define('Users', {
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
  trading_amount: DataTypes.STRING,
  categoryId: DataTypes.STRING,
  direct_earning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: undefined
  },
  team_earning: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: undefined
  },
  total_level_achieved: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: undefined
  },
  team_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: undefined
  },
  aadhar_front: DataTypes.STRING,
  aadhar_back: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('new', 'awaiting', 'blocked', 'active'),
    allowNull: true,
    defaultValue: undefined
  },
  wallet_balance: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: undefined
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});
User.hasMany(Referral, {
  foreignKey: 'referrer_id',
  as: 'Referrals'
});

module.exports = User;
