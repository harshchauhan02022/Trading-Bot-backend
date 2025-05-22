const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const Referral = sequelize.define('referrals', {
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
  type: DataTypes.ENUM('Pending', 'Active', 'Expired'),
  defaultValue: 'Pending',
 },
 reward: {
  type: DataTypes.DECIMAL(10, 2),
  defaultValue: 0.00,
 },
}, {
 timestamps: true,
});
// Referral.belongsTo(User, {
//  foreignKey: 'referred_user_id',
//  as: 'ReferredUser'
// });

module.exports = Referral;