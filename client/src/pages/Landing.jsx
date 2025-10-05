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
          <h2>TODO: Section Title</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>TODO: Feature 1</h3>
              <p>TODO: Feature description</p>
            </div>
            <div className="feature-card">
              <h3>TODO: Feature 2</h3>
              <p>TODO: Feature description</p>
            </div>
            <div className="feature-card">
              <h3>TODO: Feature 3</h3>
              <p>TODO: Feature description</p>
            </div>
            <div className="feature-card">
              <h3>TODO: Feature 4</h3>
              <p>TODO: Feature description</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">TODO</div>
              <div className="stat-label">TODO: Metric 1</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">TODO</div>
              <div className="stat-label">TODO: Metric 2</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">TODO</div>
              <div className="stat-label">TODO: Metric 3</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">TODO</div>
              <div className="stat-label">TODO: Metric 4</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
