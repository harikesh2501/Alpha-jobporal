// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import ApplyPage from './pages/ApplyPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin') === 'true');

  const handleLogin = () => {
    setIsAdmin(true);
    sessionStorage.setItem('isAdmin', 'true');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
  };

  return (
    <Router>
      <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/apply/:jobId" element={<ApplyPage />} />
          <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
          <Route
            path="/admin/dashboard"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;