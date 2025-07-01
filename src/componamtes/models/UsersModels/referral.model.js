const { DataTypes } = require('sequelize');
const User = require('./user.model');
const sequelize = require('../../../config/db');


const Referral = sequelize.define('referrals', {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },
 referrer_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
 },
 referred_user_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
 },     
 referral_date: {
  type: DataTypes.DATEONLY,
  allowNull: false,
 },
 status: {
  // type: DataTypes.ENUM('Pending', 'Active', 'Expired'),
  type: DataTypes.STRING,
  defaultValue: 'Pending',
  allowNull: false,
 },
 reward: {
  type: DataTypes.DECIMAL(10, 2),
  defaultValue: 0.00,
 },
}, {
 tableName: 'referrals',
 timestamps: true,
});

Referral.belongsTo(User, {
 foreignKey: 'referred_user_id',
 as: 'ReferredUser'
});

User.hasMany(Referral, {
 foreignKey: 'referrer_id',
 as: 'Referrals'
});


module.exports = Referral;