import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="hero">
        <h1 className="hero-title">Welcome to Our Forum</h1>
        <p className="hero-description">Join the community and start discussing interesting topics!</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button cta-button-register">
            Register
          </Link>
          <Link to="/login" className="cta-button cta-button-login">
            Login
          </Link>
        </div>
      </header>

      {/* Additional Sections */}
      <section className="py-16">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac mauris eu nisl dictum tincidunt. Nullam
            congue nisi ac justo fermentum fermentum. Vestibulum gravida mi a augue tristique cursus. Suspendisse
            potenti. Proin quis eros purus.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          {/* Add service details here */}
        </div>
      </section>

      {/* Add more sections as needed */}
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
