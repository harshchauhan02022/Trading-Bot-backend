const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const UserCategory = require('../models/category.model');
const User = require('./UsersModels/user.model');
const Wallet = require('./wallet.model');
const ReferralStat = require('./referralStat.model');
const Trade = require('./trade.model');
const Order = require('./order.model');
const Referral = require('../models/UsersModels/referral.model');

const Approval = sequelize.define('Approval', {
  user_id: DataTypes.INTEGER,
  status: DataTypes.STRING
}, {
  tableName: 'approvals',
  timestamps: false
});

User.belongsTo(UserCategory, { foreignKey: 'categoryId' }); 
User.hasOne(Wallet, { foreignKey: 'user_id' });
User.hasOne(ReferralStat, { foreignKey: 'user_id' });

User.belongsToMany(User, {
  through: Referral,
  as: 'Referrer',
  foreignKey: 'user_id',
  otherKey: 'referrer_id'
});

module.exports = {
  User,
  Approval,
  Wallet,
  ReferralStat,
  Trade,
  Order,
  UserCategory,
  Referral
};
