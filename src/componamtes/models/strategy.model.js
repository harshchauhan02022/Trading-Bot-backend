const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Strategy = sequelize.define('Strategy', {
 name: {
  type: DataTypes.STRING,
  allowNull: false
 },
 type: {
  type: DataTypes.ENUM(
   'moving_average',
   'rsi',
   'macd',
   'bollinger',
   'fibonacci',
   'custom'
  ),
  defaultValue: 'custom'
 },
 parameters: {
  type: DataTypes.JSON,
  allowNull: false
 },
 userId: {
  type: DataTypes.INTEGER,
  allowNull: false
 },

 category: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 transactionType: {
  type: DataTypes.ENUM('buy', 'sell'),
  allowNull: false,
 },
 wishlist: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 lot: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 orderType: {
  type: DataTypes.ENUM('market', 'limit'),
  allowNull: false,
 },
 limit: {
  type: DataTypes.STRING,
  allowNull: true,
 },
 userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
   model: 'users',
   key: 'id',
  },
 },

}, {
 tableName: 'strategies',
 timestamps: true
});

module.exports = Strategy;
