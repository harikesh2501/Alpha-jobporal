// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.get('/applications', adminController.getAllApplications);
router.put('/applications/:id/status', adminController.updateApplicationStatus);

module.exports = router;