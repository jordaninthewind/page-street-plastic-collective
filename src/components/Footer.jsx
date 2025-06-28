import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Page Street Plastic Collective</h3>
            <p className="footer-description">
              Dedicated to sustainable plastic solutions and environmental conservation.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Page Street, City, State</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@pagestreetplastic.com</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="social-icon">📘</i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="social-icon">🐦</i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="social-icon">📷</i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="social-icon">💼</i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Page Street Plastic Collective. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 