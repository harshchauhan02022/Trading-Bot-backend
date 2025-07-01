// wallet.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Wallet = sequelize.define('Wallet', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  tableName: 'wallets',
  timestamps: false
});

module.exports = Wallet;

