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

const app = express();
app.use(cors());
app.use('/public', express.static('public'));
app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', tradeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', CategoryRoutes)

// Sync Sequelize and start server
Sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
});
