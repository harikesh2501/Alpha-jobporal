// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const applicationController = require('../controllers/applicationController');
const upload = require('../middleware/uploadMiddleware');

// Job routes (public & admin)
router.post('/', jobController.createJob); // Admin
router.get('/', jobController.getAllJobs); // Public
router.get('/:id', jobController.getJobById); // Public

// Application route (nested under jobs)
router.post('/:jobId/apply', upload.single('resume'), applicationController.applyToJob);

module.exports = router;