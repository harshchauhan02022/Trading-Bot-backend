const { User, UserCategory, Wallet, ReferralStat, Trade, Approval } = require('../models/dashboard.model');
const { Op } = require('sequelize');
const Order = require('../models/order.model');

module.exports = {
 getDashboardData: async (req, res) => {
  try {
   const [
    totalUsers,
    newUsers,
    blockedUsers,
    awaitingApproval,
    totalTrades,
    buyTrades,
    sellTrades,
    totalProfitResult
   ] = await Promise.all([
    User.count(),
    User.count({ where: { status: 'new' } }),
    User.count({ where: { status: 'blocked' } }),
    User.count({ where: { status: 'awaiting' } }),
    // User.count({ where: { status: 'active' } }),

    Trade.count(),
    Trade.count({ where: { transaction_type: 'Buy' } }),
    Trade.count({ where: { transaction_type: 'Sell' } }),
    Trade.sum('profit')
   ]);

   res.json({
    totalUsers,
    newUsers,
    awaitingApproval,
    blockedUsers,
    totalTrades,
    totalProfit: totalProfitResult || 0,
    transaction_type: {
     Buy: buyTrades,
     Sell: sellTrades
    }
   });

  } catch (err) {
   console.error('Dashboard error:', err);
   res.status(500).json({ error: err.message });
  }
 },

 getFullDashboardData: async (req, res) => {
  try {
   const user = await User.findOne({
    where: { email: 'harshchauhan@gmail.com' },
    include: [
     { model: UserCategory },
     { model: Wallet },
     { model: ReferralStat },
     {
      model: User,
      as: 'Referrer',
      through: { attributes: [] }
     }
    ]
   });

   if (!user) {
    return res.status(404).json({ error: 'User not found' });
   }

   const tradeCount = await Trade.count({ where: { user_id: user.id } });
   const orderCount = await Order.count({ where: { user_id: user.id } });

   const formattedData = {
    users: {
     full_name: user.full_name,
     email: user.email,
     mobile_number: user.mobile_number,
     gender: user.gender,
     // address: `City ${user.address_city}, Dist ${user.address_district}`,
     address: user.address,
     state: user.state,
     registration_date: formatDate(user.registration_date),
     // activation_date: formatDate(user.activation_date),
     broker: user.broker,
     trading_amount: `${user.trading_amount} Dollar`,
     user_categories: `${user.UserCategory?.amount || 0} Dollar`,
     status: user.status,
     refer_id: user.refer_id,
     aadhar_front: user.aadhar_front,
     aadhar_back: user.aadhar_back,
     // aadhar_document: {
     //  front: user.DocumentAadhar
     //   ? `${process.env.BASE_URL}/documents/${user.DocumentAadhar.front_image}`
     //   : null,
     //  back: user.DocumentAadhar
     //   ? `${process.env.BASE_URL}/documents/${user.DocumentAadhar.back_image}`
     //   : null
     // }
    },
    trades: {
     view: "View",
     trade_history: `Trade History (${tradeCount})`
    },
    orders: {
     view: "View",
     order_history: `Order History (${orderCount})`
    },
    wallet: {
     recharge_amount: `${user.Wallet?.balance || 0} Dollar`,
     payment: {
      view: "View",
      payment_history: "Payment History"
     }
    },
    referral_stats: {
     direct_refer_user: `${user.ReferralStat?.direct_refer_count || 0} User`,
     refer_user_team: `${user.ReferralStat?.team_refer_count || 0} User`,
     total_level_achieved: `${user.ReferralStat?.total_level_achieved || 0} Level`,
     total_level_earning: `${user.ReferralStat?.total_earning || 0} Dollar`,
     views: ["View", "View", "View"]
    },
    refer_by: user.Referrer ? {
     name: user.Referrer.full_name,
     email: user.Referrer.email,
     mobile: user.Referrer.mobile_number,
     address: user.Referrer.address_city,
     refer_id: user.Referrer.refer_id
    } : null
   };

   res.json({ success: true, data: formattedData });

  } catch (err) {
   res.status(500).json({
    success: false,
    message: 'Error fetching dashboard data',
    error: err.message
   });
  }
 }
};


function formatDate(date) {
 if (!date) return null;
 const d = new Date(date);
 const day = d.getDate().toString().padStart(2, '0');
 const month = d.toLocaleString('default', { month: 'short' });
 const year = d.getFullYear();
 return `${day}-${month}-${year}`;
}
