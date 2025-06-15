// backend/controllers/adminController.js
const { Application, Job } = require('../models');

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ success: true, message: 'Admin login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};

exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.findAll({ include: Job });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.json({ message: `Application status updated to ${status}`, application });
  } catch (error) {
    next(error);
  }
};