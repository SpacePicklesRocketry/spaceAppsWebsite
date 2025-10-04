import { Link } from 'react-router-dom'
import STLViewer from '../components/STLViewer'
import './Landing.css'

const Landing = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Welcome to LEO Satellite Hub
          </h1>
          <p className="hero-subtitle">
            Affordable space research platform for educational institutions
          </p>
          
          <div className="stl-viewer-container">
            <STLViewer 
              modelPath="/models/test.stl" 
              autoRotate={true} 
              scale={0.0175} 
              color="#06b6d4"
              cameraPosition={[20, 40, 28]} 
            />
          </div>
          
          <div className="hero-description">
            <h2>Revolutionizing LEO Research</h2>
            <p>
              One of the biggest limitations on commercial exploration of LEO is the high cost of developing full satellites. Our standardized hub system offers companies a cheap and easy way to conduct LEO research without the complexities of space operation.
            </p>
          </div>
          
          <div className="cta-section">
            <Link to="/business-model" className="cta-button">
              Explore Our Business Model →
            </Link>
            <Link to="/technology" className="cta-button-secondary">
              View Technology Details
            </Link>
          </div>
        </div>
      </section>
      
      {/* Additional sections will be added in the landing page implementation phase */}
      <section className="features-section">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Modular Design</h3>
              <p>Standardized system to add instruments to our orbital hub</p>
            </div>
            <div className="feature-card">
              <h3>Thermal & Debris Protection</h3>
              <p>Built-in solutions for thermal extremes and small space debris</p>
            </div>
            <div className="feature-card">
              <h3>Affordable Access</h3>
              <p>Eliminate the high costs of developing a full satellite system</p>
            </div>
            <div className="feature-card">
              <h3>Expandable Offerings</h3>
              <p>Future options for custom modules and personalized orbits</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50%</div>
              <div className="stat-label">Cost Reduction</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Multiple</div>
              <div className="stat-label">Orbit Options</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Modular</div>
              <div className="stat-label">Integration</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
