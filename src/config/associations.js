// config/associations.js
const User = require('../models/user.model');
const Referral = require('../models/referral.model');
const TrackHistory = require('../models/trackHistory.model');

// User Relationships
User.hasMany(Referral, { foreignKey: 'user_id' });
User.hasMany(TrackHistory, { foreignKey: 'user_id' });

// Referral Relationships
Referral.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Referral, TrackHistory };