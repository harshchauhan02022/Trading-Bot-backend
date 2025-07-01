const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Order = sequelize.define('Order', {
 user_id: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 category_id: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 order_date: {
  type: DataTypes.DATEONLY,
  allowNull: false,
 },
 order_time: {
  type: DataTypes.TIME,
  allowNull: false,
 },
 symbol: {
  type: DataTypes.STRING(20),
  allowNull: false,
 },
 margin_type: {
  type: DataTypes.ENUM('Buy', 'Sell'),
  allowNull: false,
 },
 transaction_amount: {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: false,
 },
 filled: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
 },
 description: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
}, {
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: false,
});

module.exports = Order;
