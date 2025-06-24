const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const PaymentHistory = sequelize.define('PaymentHistory', {
 id: {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
 },
 categoryId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
   model: 'categories',
   key: 'id'
  }
 },
 amount: {
  type: DataTypes.FLOAT,
  allowNull: false
 },
 paymentMethod: {
  type: DataTypes.STRING,
  allowNull: false
 },
 status: {
  type: DataTypes.ENUM('pending', 'completed', 'failed'),
  allowNull: false,
  defaultValue: 'pending'
 },
 transactionId: {
  type: DataTypes.STRING,
  allowNull: true
 }
}, {
 tableName: 'payment_history',
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: 'updated_at'
});

module.exports = PaymentHistory;
