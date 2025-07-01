const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const Level = sequelize.define('levels', {
 level: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  allowNull: false,
 },
 percentage: {
  type: DataTypes.FLOAT,
  allowNull: false,
 },
 direct_users: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 0,
 },
 team_users: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 0,
 },
 direct_earning: {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: false,
  defaultValue: 0.00,
 },
 team_earning: {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: false,
  defaultValue: 0.00,
 },
}, {
 timestamps: false,
});

module.exports = Level;