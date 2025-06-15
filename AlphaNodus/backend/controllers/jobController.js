// backend/controllers/jobController.js
const { Job, Application } = require('../models');
const { Sequelize } = require('sequelize');

exports.createJob = async (req, res, next) => {
  try {
    const { title, department, location, description, postingDate } = req.body;
    const newJob = await Job.create({ title, department, location, description, postingDate });
    res.status(201).json(newJob);
  } catch (error) {
    next(error);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("Applications.id")), "applicationCount"]]
      },
      include: [{
        model: Application, attributes: []
      }],
      group: ['Job.id'],
      order: [['postingDate', 'DESC']],
    });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
};