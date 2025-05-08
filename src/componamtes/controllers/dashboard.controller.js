const DashboardModel = require('../models/dashboard.model');

const handleResult = (res, key) => (err, results) => {
 if (err) return res.status(500).json({ error: err.message });
 res.json({ [key]: results[0].count ?? results[0].total });
};

module.exports = {
 getNewUsers: (req, res) => DashboardModel.getNewUsers(handleResult(res, 'new_users')),
 getBlockedUsers: (req, res) => DashboardModel.getBlockedUsers(handleResult(res, 'blocked_users')),
 getAwaitingUsers: (req, res) => DashboardModel.getAwaitingUsers(handleResult(res, 'awaiting_users')),
 getTotalTrades: (req, res) => DashboardModel.getTotalTrades(handleResult(res, 'total_trades')),
 getTargetTrades: (req, res) => DashboardModel.getTargetTrades(handleResult(res, 'target_trades')),
 getStopHuntTrades: (req, res) => DashboardModel.getStopHuntTrades(handleResult(res, 'stophunt_trades')),
 getTotalUsers: (req, res) => DashboardModel.getTotalUsers(handleResult(res, 'total_users')),
 getTotalProfit: (req, res) => DashboardModel.getTotalProfit((err, results) => {
  if (err) return res.status(500).json({ error: err.message });
  res.json({ total_profit: results[0].total ?? 0 });
 })
};
