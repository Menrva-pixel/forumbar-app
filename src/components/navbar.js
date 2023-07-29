import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ isAuthenticated, user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">My Forum</Link>
        </div>
        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <span className="navbar-link">Hello, {user.name}</span>
              </li>
              <li className="nav-item">
                <Link to="/forum" className="nav-links">
                  Forum
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/leaderboard" className="nav-links">
                  Leaderboard
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
              <li className="navbar-item">
                <Link to="/forum" className="navbar-link">Forum</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  user: state.auth.user, 
});

export default connect(mapStateToProps)(Navbar);
