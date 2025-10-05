import { Link } from 'react-router-dom'
import SpaceHero from '../components/SpaceHero'
import './Landing.css'

const Landing = () => {
  return (
    <div className="landing-page">
      <SpaceHero />
      
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
