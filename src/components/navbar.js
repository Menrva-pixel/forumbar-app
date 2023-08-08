import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import logo from '../images/react-logo.png';

const Navbar = ({ isAuthenticated, user, logoutUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo"><img src={logo}></img></Link>
        </div>
        <ul className="navbar-menu">
          {isAuthenticated && user ? (
            <>
              <li className="navbar-item">
                <Link to={`/profile/${user.id}`} className="navbar-link">Hello, {user.name}</Link>
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
              <li className="nav-item">
                <button className="navbar-link" onClick={handleLogout}>
                  Logout
                </button>
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

export default connect(mapStateToProps, { logoutUser })(Navbar);
