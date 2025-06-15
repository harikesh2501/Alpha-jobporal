// frontend/src/pages/AdminDashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CreateJobForm from '../components/CreateJobForm';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  const fetchApplications = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/admin/applications');
      setApplications(data);
    } catch (err) {
      setError('Failed to load applications.');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleJobCreated = (newJob) => {
    // Optionally, refresh or update a list of jobs if displayed here
    console.log('New job created:', newJob);
  };

  const handleStatusUpdate = async (id, status) => {
    try {
        await axios.put(`/api/admin/applications/${id}/status`, { status });
        // Refresh the list to show the new status
        fetchApplications();
    } catch (err) {
        alert('Failed to update status.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CreateJobForm onJobCreated={handleJobCreated} />

      <div className="card">
        <h2>Submitted Applications</h2>
        {error && <p className="error">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Applied For</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map(app => (
                <tr key={app.id}>
                  <td>{app.fullName}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.Job ? app.Job.title : 'N/A'}</td>
                  <td>{app.status}</td>
                  <td>
                    <a href={`/${app.resumePath}`} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </td>
                  <td>
                    {app.status === 'pending' && (
                        <>
                            <button onClick={() => handleStatusUpdate(app.id, 'accepted')} style={{marginRight: '5px', backgroundColor: '#28a745'}}>Accept</button>
                            <button onClick={() => handleStatusUpdate(app.id, 'rejected')} style={{backgroundColor: '#dc3545'}}>Reject</button>
                        </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No applications submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;