import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">TODO: Company Name</h3>
            <p className="footer-description">
              TODO: Company description
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/business-model" className="footer-link">Business Model</Link>
              <Link to="/technology" className="footer-link">Technology</Link>
              <Link to="/dashboard" className="footer-link">Dashboard</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <p>Email: TODO: email</p>
              <p>Phone: TODO: phone</p>
              <p>Address: TODO: address</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © 2024 TODO: Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
