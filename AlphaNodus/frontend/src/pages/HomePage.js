// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('/api/jobs');
        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Available Job Postings</h1>
      {error && <p className="error">{error}</p>}
      {jobs.length > 0 ? (
        jobs.map(job => (
          <div key={job.id} className="card">
            <h2>{job.title}</h2>
            <p><strong>Department:</strong> {job.department}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Posted:</strong> {new Date(job.postingDate).toLocaleDateString()}</p>
            <p><strong>Applications:</strong> {job.applicationCount}</p>
            <Link to={`/jobs/${job.id}`}>View Details & Apply</Link>
          </div>
        ))
      ) : (
        <p>No job postings available at the moment.</p>
      )}
    </div>
  );
}

export default HomePage;