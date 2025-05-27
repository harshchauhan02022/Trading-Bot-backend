const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Trade = sequelize.define('Trade', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trade_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  trade_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  transaction_type: {
    type: DataTypes.ENUM('Buy', 'Sell'),
    allowNull: false,
  },
  margin: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  loss: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  profit: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  notes: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Trade;
