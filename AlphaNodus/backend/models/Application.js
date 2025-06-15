// backend/models/Application.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resumePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverLetter: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  },
});

module.exports = Application;