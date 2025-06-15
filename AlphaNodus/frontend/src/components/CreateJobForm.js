// frontend/src/components/CreateJobForm.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateJobForm({ onJobCreated }) {
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    location: '',
    description: '',
    postingDate: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('/api/jobs', jobData);
      setSuccess('Job created successfully!');
      onJobCreated(response.data);
      // Reset form
      setJobData({
        title: '', department: '', location: '', description: '',
        postingDate: new Date().toISOString().slice(0, 10),
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job.');
    }
  };

  return (
    <div className="card">
      <h2>Create New Job Posting</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input type="text" name="title" value={jobData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={jobData.department} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={jobData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={jobData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Posting Date</label>
          <input type="date" name="postingDate" value={jobData.postingDate} onChange={handleChange} required />
        </div>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
}

export default CreateJobForm;