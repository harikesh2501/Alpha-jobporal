// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
// Note: Application routes are nested within job and admin routes

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

// Sync database and start server
db.sequelize.sync().then(() => {
  console.log('Database connected and synced.');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});