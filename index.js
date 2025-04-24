const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const adminRoutes = require('./src/componamtes/routes/admin.routes');
const Sequelize = require('./src/config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);

// Sync Sequelize and start server
Sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
});
