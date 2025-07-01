const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const adminRoutes = require('./src/componamtes/routes/admin.routes');
const userRoutes = require('./src/componamtes/routes/UsersRoutes/user.routes')
const tradeRoutes = require('./src/componamtes/routes/trade.routes')
const dashboardRoutes = require('./src/componamtes/routes/dashboard.routes')
const Sequelize = require('./src/config/db');
const CategoryRoutes = require('./src/componamtes/routes/category.Routes');
const orderRoutes = require('./src/componamtes/routes/order.routes');
const StrategyRoutes = require('./src/componamtes/routes/Strategies.routes');
const MarketRoutes = require('.//src/componamtes/routes/market.routes');
const paymentsRoutes = require('./src/componamtes/routes/paymentHistory.route')

const app = express();
// app.use(cors({ origin: 'http://localhost:5174/' }));
app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


app.use('/api/admin', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', tradeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', CategoryRoutes)
app.use('/api', orderRoutes)
app.use('/api/strategies', StrategyRoutes);
app.use('/api/market', MarketRoutes);
app.use('/api', paymentsRoutes)

// Express.js example
app.get("/", (req, res) => {
  res.json([{ id: 1, name: "Harsh" }]); 
});

  
Sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000,'0.0.0.0', () => {
    console.log(`🚀 Server running at http://0.0.0.0:${process.env.PORT}`);
  });
});
