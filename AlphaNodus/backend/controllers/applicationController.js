// backend/controllers/applicationController.js
const { Application, Job } = require('../models');
const { Op } = require('sequelize');

const MAX_JOB_APPLICATIONS = 10;
const MAX_DAILY_APPLICATIONS_PER_CANDIDATE = 5;

exports.applyToJob = async (req, res, next) => {
  const { jobId } = req.params;
  const { fullName, email, phone, coverLetter } = req.body;

  try {
    // Basic validation
    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: 'Full Name, Email, and Phone are required.' });
    }
    if (fullName.length < 2 || fullName.length > 32) {
      return res.status(400).json({ message: 'Full Name must be between 2 and 32 characters.' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Resume (PDF) is required.' });
    }
    
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // Constraint 1: Job cannot have more than 10 active applications
    const activeAppCount = await Application.count({ where: { jobId } });
    if (activeAppCount >= MAX_JOB_APPLICATIONS) {
      return res.status(403).json({ message: 'This job is no longer accepting applications (limit reached).' });
    }

    // Constraint 2: Only 1 application per applicant per job
    const existingApplication = await Application.findOne({ where: { jobId, email } });
    if (existingApplication) {
      return res.status(409).json({ message: 'You have already applied for this job.' });
    }

    // BONUS Constraint 3: No more than 5 job applications per candidate in 24 hours
    const twentyFourHoursAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    const dailyAppCount = await Application.count({
      where: {
        email,
        status: { [Op.ne]: 'rejected' }, // Rejected applications don't count
        createdAt: { [Op.gte]: twentyFourHoursAgo },
      },
    });

    if (dailyAppCount >= MAX_DAILY_APPLICATIONS_PER_CANDIDATE) {
      return res.status(429).json({ message: 'You have reached the daily application limit (5 per 24 hours).' });
    }
    
    // Create Application
    const newApplication = await Application.create({
      fullName,
      email,
      phone,
      resumePath: req.file.path,
      coverLetter,
      jobId,
    });

    res.status(201).json({ message: 'Application submitted successfully!', application: newApplication });

  } catch (error) {
    next(error);
  }
};