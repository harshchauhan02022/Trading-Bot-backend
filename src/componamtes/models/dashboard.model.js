const User = require('../models/UsersModels/user.model');
const UserCategory = require('../models/category.model');
const Wallet = require('../models/wallet.model');
const ReferralStat = require('../models/referralStat.model');
const Referral = require('../models/UsersModels/referral.model');

// Associations
User.hasOne(UserCategory, { foreignKey: 'user_id' });
User.hasOne(Wallet, { foreignKey: 'user_id' });
User.hasOne(ReferralStat, { foreignKey: 'user_id' });

// Many-to-Many Self Association for Referral
User.belongsToMany(User, {
  through: Referral,
  as: 'Referrer',
  foreignKey: 'user_id',
  otherKey: 'referrer_id'
});

module.exports = {
  User,
  UserCategory,
  Wallet,
  ReferralStat,
  Referral
};
