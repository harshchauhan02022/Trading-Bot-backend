const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Wallet = sequelize.define('Wallet', {
 user_id: DataTypes.INTEGER,
 balance: DataTypes.FLOAT
}, {
 timestamps: false
});

module.exports = Wallet;