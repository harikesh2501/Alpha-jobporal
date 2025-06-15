// frontend/src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ isAdmin, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div>
        <NavLink to="/" className="logo">JobBoard</NavLink>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        {isAdmin ? (
          <>
            <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
            <a href="#!" onClick={handleLogoutClick}>Logout</a>
          </>
        ) : (
          <NavLink to="/admin">Admin Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;