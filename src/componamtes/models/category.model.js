const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Category = sequelize.define('Category', {
 categories_name: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 trading_amount: {
  type: DataTypes.INTEGER,
  allowNull: false,
 },
}, {
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: 'updated_at',
});

module.exports = Category;
