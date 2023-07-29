import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">My Forum</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="navbar-link">Register</Link>
          </li>
          <li className="navbar-item">
            <Link to="/forum" className="navbar-link">Forum</Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-links">
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
