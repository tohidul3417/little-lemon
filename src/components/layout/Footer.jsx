import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-grid">
          {/* Restaurant Info */}
          <div className="footer-section">
            <h3>Little Lemon</h3>
            <p className="restaurant-description">
              Experience authentic Mediterranean cuisine in the heart of Chicago. 
              Family-owned since 1995, bringing you the finest flavors of the Mediterranean.
            </p>
          </div>

          {/* Contact Information */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} />
                <span>123 Mediterranean Ave, Chicago, IL 60601</span>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:+13125551234">(312) 555-1234</a>
              </li>
              <li>
                <Mail size={18} />
                <a href="mailto:info@littlelemon.com">info@littlelemon.com</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="footer-section">
            <h4>Opening Hours</h4>
            <ul className="hours-list">
              <li>
                <Clock size={18} />
                <div>
                  <span>Monday - Friday</span>
                  <span>11:00 AM - 10:00 PM</span>
                </div>
              </li>
              <li>
                <Clock size={18} />
                <div>
                  <span>Saturday - Sunday</span>
                  <span>12:00 PM - 11:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="quick-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="footer-bottom">
          <div className="social-links">
            <a href="https://instagram.com/littlelemon" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://facebook.com/littlelemon" aria-label="Facebook">
              Facebook
            </a>
            <a href="https://twitter.com/littlelemon" aria-label="Twitter">
              Twitter
            </a>
          </div>

          <div className="newsletter">
            <h4>Subscribe to our Newsletter</h4>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                aria-label="Email for newsletter"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>&copy; {currentYear} Little Lemon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
