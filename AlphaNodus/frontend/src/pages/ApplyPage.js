// frontend/src/pages/ApplyPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ApplyPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!resume) {
      setError('Please upload your resume.');
      return;
    }
    
    setIsLoading(true);

    const submissionData = new FormData();
    submissionData.append('fullName', formData.fullName);
    submissionData.append('email', formData.email);
    submissionData.append('phone', formData.phone);
    submissionData.append('coverLetter', formData.coverLetter);
    submissionData.append('resume', resume);

    try {
      await axios.post(`/api/jobs/${jobId}/apply`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Your application has been submitted successfully! Redirecting home...');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Apply for Job</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name (2-32 characters)</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required minLength="2" maxLength="32" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Resume (PDF only)</label>
          <input type="file" name="resume" onChange={handleFileChange} accept=".pdf" required />
        </div>
        <div className="form-group">
          <label>Cover Letter (Optional)</label>
          <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} />
        </div>
        <button type="submit" disabled={isLoading || success}>
            {isLoading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}

export default ApplyPage;