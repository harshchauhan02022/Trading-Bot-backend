const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ReferralStat = sequelize.define('ReferralStat', {
 user_id: DataTypes.INTEGER,
 direct_refer_count: DataTypes.INTEGER,
 team_refer_count: DataTypes.INTEGER,
 total_level_achieved: DataTypes.INTEGER,
 total_earning: DataTypes.FLOAT
}, {
 timestamps: false
});

module.exports = ReferralStat;