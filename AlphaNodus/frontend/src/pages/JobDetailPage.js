// frontend/src/pages/JobDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${id}`);
        setJob(data);
      } catch (err) {
        setError('Job not found or failed to load.');
        console.error(err);
      }
    };
    fetchJob();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card">
      <h1>{job.title}</h1>
      <p><strong>Department:</strong> {job.department}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Posted:</strong> {new Date(job.postingDate).toLocaleDateString()}</p>
      <hr/>
      <h3>Job Description</h3>
      <p className="job-detail">{job.description}</p>
      <Link to={`/apply/${job.id}`}>
        <button>Apply for this Position</button>
      </Link>
    </div>
  );
}

export default JobDetailPage;