// backend/models/index.js
const sequelize = require('../config/database');
const Job = require('./Job');
const Application = require('./Application');

// Define Associations
Job.hasMany(Application, { foreignKey: 'jobId', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  Job,
  Application,
};

module.exports = db;