// models/trackHistory.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Category = require('./category.model');

const TrackHistory = sequelize.define('TrackHistory', {
 date: {
  type: DataTypes.DATE,
  allowNull: false,
 },
 symbol: {
  type: DataTypes.STRING(50),
  allowNull: false,
 },
 transaction_type: {
  type: DataTypes.ENUM('Buy', 'Sell'),
  allowNull: false,
 },
 margin: {
  type: DataTypes.FLOAT,
  allowNull: false,
 },
 loss: {
  type: DataTypes.FLOAT,
  allowNull: true,
 },
 profit: {
  type: DataTypes.FLOAT,
  allowNull: true,
 },
 userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
 },
 categoryId: {
  type: DataTypes.INTEGER,
  allowNull: false,
 },
}, {
 timestamps: false,
});

// Define associations
TrackHistory.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = TrackHistory;
