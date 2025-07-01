// const Sequelize = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../models/UsersModels/user.model');
const Referral = require('../models/UsersModels/referral.model');

const Category = require('./category.model');
const TrackHistory = require('./UsersModels/trackHistory.model');


const User = defineUser(sequelize);
const Referral = defineReferral(sequelize);

TrackHistory.belongsTo(Category, { foreignKey: 'categoryId' });

User.hasMany(Referral, { foreignKey: 'referrer_id', as: 'Referrals' });
Referral.belongsTo(User, { foreignKey: 'referred_user_id', as: 'ReferredUser' });

module.exports = {
  sequelize,
  Category,
  TrackHistory,
  User,
  Referral,
};
