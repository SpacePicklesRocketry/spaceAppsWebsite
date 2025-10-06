import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Voxel Space</h3>
            <p className="footer-description">
              Revolutionizing space research through<br />
              modular satellite hub technology.<br />
              Our innovative platform provides<br />
              cost-effective, shared infrastructure<br />
              for researchers and companies to<br />
              conduct experiments in space.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/business-model" className="footer-link">Business Model</Link>
              <Link to="/technology" className="footer-link">Technology</Link>
              <Link to="/dashboard" className="footer-link">Dashboard</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © 2024 Voxel Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
