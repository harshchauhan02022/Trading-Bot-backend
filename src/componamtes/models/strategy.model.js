const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Strategy = sequelize.define('Strategy', {
 name: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Manual Strategy' },
 type: {
  type: DataTypes.ENUM('moving_average', 'rsi', 'macd', 'bollinger', 'fibonacci', 'custom'),
  defaultValue: 'custom'
 },
 parameters: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
 userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: { model: 'users', key: 'id' }
 },
 categoryId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: { model: 'categories', key: 'id' }
 },
 transaction_type: {
  type: DataTypes.ENUM('buy', 'sell'),
  allowNull: false
 },
 wishlist: { type: DataTypes.STRING, allowNull: false },
 lot: { type: DataTypes.STRING, allowNull: false, defaultValue: '1' },
 order_type: {
  type: DataTypes.ENUM('market', 'limit'),
  allowNull: false
 },
 entry_limit: { type: DataTypes.FLOAT, allowNull: true },
 exit_limit: { type: DataTypes.FLOAT, allowNull: true }
}, {
 tableName: 'strategies',
 timestamps: true,
 createdAt: 'created_at',
 updatedAt: 'updated_at'
});

const Condition = sequelize.define('Condition', {
 strategyId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: { model: 'strategies', key: 'id' }
 },
 condition_type: {
  type: DataTypes.ENUM('entry', 'exit'),
  allowNull: false
 },
 time_frame: { type: DataTypes.STRING },
 limit_value: { type: DataTypes.FLOAT },
 exit_type: { type: DataTypes.STRING },
 long_indicator1: { type: DataTypes.STRING, allowNull: false },
 long_comparator: { type: DataTypes.STRING, allowNull: false },
 long_indicator2: { type: DataTypes.STRING, allowNull: false },
 short_indicator1: { type: DataTypes.STRING, allowNull: false },
 short_comparator: { type: DataTypes.STRING, allowNull: false },
 short_indicator2: { type: DataTypes.STRING, allowNull: false },
 logical_operator: {
  type: DataTypes.ENUM('AND', 'OR'),
  allowNull: false,
  defaultValue: 'AND'
 },
 condition_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
 tableName: 'conditions',
 timestamps: false
});

Strategy.hasMany(Condition, { foreignKey: 'strategyId', as: 'conditions' });
Condition.belongsTo(Strategy, { foreignKey: 'strategyId' });

module.exports = { Strategy, Condition };
