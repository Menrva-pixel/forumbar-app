import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../index.css';
import infoImg from '../images/react-logo.png';
import discussion from '../images/Discussion.png';
import networking from '../images/Networking.png';
import tutorial from '../images/Tutorial.png';

const LandingPage = ({ isAuthenticated }) => {
  useEffect(() => {
    const handleParallax = () => {
      const infoSection = document.querySelector('.info-section');
      const scrollPosition = window.pageYOffset;
      infoSection.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    };

    window.addEventListener('scroll', handleParallax);

    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <div className="landing-page">
      <header className="hero">
        <h1 className="hero-title">Hi Coders! Welcome to ForumBar</h1>
        <p className="hero-description">Join the community and start discussing interesting topics!</p>
        <div className="cta-buttons">
        {!isAuthenticated && (
          <>
          <Link to="/register" className="cta-button cta-button-register">
            Register
          </Link>
          <Link to="/login" className="cta-button cta-button-login">
            Login
          </Link>
          </>
        )}
        </div>
      </header>

      <section className="info-section">
        <div className="info-container">
          <img src={infoImg} alt="React Logo" className="info-image" />
          <div className="info-title">
            <h2 className="info-section-title">About Us</h2>
            <p className="info-section-description">
            We provide a platform for programmers to share information and knowledge about Software Developer, 
            Web Developer, Software Engineer, Networking, and Cybersecurity. All are welcome.
          </p>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section>
        <div className="service-container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-description">Here are some of the services we provide to our community.</p>
          <div className="service-list">
            <div className="service-item">
              <img src={discussion} alt="Discussion Forums Icon" />
              <h3>Discussion Forums</h3>
              <p>Engage in various programming discussions with other members.</p>
            </div>
            <div className="service-item">
              <img src={tutorial} alt="Tutorials Icon" />
              <h3>Tutorials</h3>
              <p>Access a wide range of programming tutorials to enhance your skills.</p>
            </div>
            <div className="service-item">
              <img src={networking} alt="Networking Icon" />
              <h3>Networking</h3>
              <p>Connect with fellow programmers and professionals in the industry.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(LandingPage);
