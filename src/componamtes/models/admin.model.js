const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const AdminUser = sequelize.define('admin_users', {
  mobile: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  otp: {
    type: DataTypes.STRING(6),
    allowNull: true,
  },
  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'admin_users',
  timestamps: true,
});

module.exports = AdminUser;
