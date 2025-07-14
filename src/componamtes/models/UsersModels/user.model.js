const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const User = sequelize.define('User', {
  full_name: DataTypes.STRING,
  email: { type: DataTypes.STRING, allowNull: true },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mobile_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  address: DataTypes.STRING,
  registration_date: DataTypes.DATE,
  activation_date: DataTypes.DATE,
  trading_categories: DataTypes.STRING,
  gender: DataTypes.STRING,
  state: DataTypes.STRING,
  broker: DataTypes.STRING,
  refer_id: DataTypes.STRING,
  refer_by: DataTypes.STRING,
  exness_broker_id: DataTypes.STRING,
  app_name: DataTypes.STRING,
  api_key: DataTypes.STRING,
  api_secret_key: DataTypes.STRING,
  trading_amount: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  aadhar_front: DataTypes.STRING,
  aadhar_back: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('new', 'awaiting', 'blocked', 'active'),
    allowNull: true,
    defaultValue: 'new'
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

User.belongsTo(User, {
  foreignKey: 'refer_by',
  targetKey: 'refer_id',
  as: 'referrer'
});
User.hasMany(User, { foreignKey: 'refer_by', as: 'referrals' });

module.exports = User;
