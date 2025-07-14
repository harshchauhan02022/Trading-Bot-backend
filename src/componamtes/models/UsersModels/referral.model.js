const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('./user.model');

const ReferralEarning = sequelize.define('ReferralEarning', {
 user_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
 },
 from_user_id: {
  type: DataTypes.INTEGER,
  allowNull: true,
 },
 amount: {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: false,
 },
 level: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 1,
 }
}, {
 tableName: 'referral_earnings',
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: false,
});

User.hasMany(ReferralEarning, { foreignKey: 'user_id' });
ReferralEarning.belongsTo(User, { foreignKey: 'user_id', as: 'receiver' });

User.hasMany(ReferralEarning, { foreignKey: 'from_user_id' });
ReferralEarning.belongsTo(User, { foreignKey: 'from_user_id', as: 'source' });

module.exports = ReferralEarning;
