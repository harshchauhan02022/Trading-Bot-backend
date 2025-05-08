const db = require('../../config/db');

module.exports = {
  getNewUsers: (callback) => {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE status = 'new'`;
    db.query(sql, callback);
  },

  getBlockedUsers: (callback) => {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE status = 'blocked'`;
    db.query(sql, callback);
  },

  getAwaitingUsers: (callback) => {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE status = 'awaiting'`;
    db.query(sql, callback);
  },

  getTotalTrades: (callback) => {
    const sql = `SELECT COUNT(*) AS count FROM trades`;
    db.query(sql, callback);
  },

  getTargetTrades: (callback) => {
    const sql = `SELECT COUNT(*) AS count FROM trades WHERE trade_type = 'buy'`;
    db.query(sql, callback);
  },

  getStopHuntTrades: (callback) => {
    const sql = `SELECT COUNT(*) AS count FROM trades WHERE trade_type = 'sell'`;
    db.query(sql, callback);
  },

  getTotalUsers: (callback) => {
    const sql = `SELECT COUNT(*) AS count FROM users`;
    db.query(sql, callback);
  },

  getTotalProfit: (callback) => {
    // Assuming "profit" is calculated as quantity * price for now
    const sql = `SELECT SUM(quantity * price) AS total FROM trades`;
    db.query(sql, callback);
  }
};
