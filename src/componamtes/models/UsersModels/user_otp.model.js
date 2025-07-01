const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('./user.model');

const UserOtp = sequelize.define('UserOtp', {
 user_id: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
   model: User,
   key: 'id'
  },
  onDelete: 'CASCADE'
 },
 mobile_number: {
  type: DataTypes.STRING,
  allowNull: false
 },
 otp: {
  type: DataTypes.STRING(6),
  allowNull: true
 },
 otpExpiry: {
  type: DataTypes.DATE,
  allowNull: true
 }
}, {
 tableName: 'user_otp',
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: 'updated_at'
});

User.hasOne(UserOtp, {
 foreignKey: 'user_id',
 as: 'otpInfo'
});
UserOtp.belongsTo(User, {
 foreignKey: 'user_id',
 as: 'userInfo'
});

module.exports = UserOtp;
