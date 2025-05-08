const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Trade = sequelize.define('Trade', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock_symbol: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  trade_type: {
    type: DataTypes.ENUM('buy', 'sell'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  trade_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Trade;
