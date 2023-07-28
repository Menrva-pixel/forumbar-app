import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Our Forum</h1>
        <p>Join the community and start discussing interesting topics!</p>
        <div className="cta-buttons">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
