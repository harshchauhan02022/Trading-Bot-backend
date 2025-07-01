const { DataTypes } = require('sequelize');
const sequelize= require('../../config/db');
const Category = require('./category.model');

const PaymentHistory = sequelize.define('PaymentHistory', {
 id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
 categoryId: { type: DataTypes.INTEGER, allowNull: false },
 date: { type: DataTypes.DATEONLY, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 contact: { type: DataTypes.STRING, allowNull: false },
 symbol: { type: DataTypes.STRING, allowNull: false },
 transaction: { type: DataTypes.STRING, allowNull: false },
 trading_amount: { type: DataTypes.STRING, allowNull: false },
 margin: { type: DataTypes.INTEGER, allowNull: false },
 profit: { type: DataTypes.INTEGER, allowNull: false },
 profit_share: { type: DataTypes.INTEGER, allowNull: false },
 payment_status: { type: DataTypes.ENUM('Pending', 'Completed'), allowNull: false, defaultValue: 'Pending' }
}, {
 tableName: 'payment_history',
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: 'updated_at'
});


PaymentHistory.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = PaymentHistory;
