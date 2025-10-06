import { Link } from 'react-router-dom'
import SpaceHero from '../components/SpaceHero'
import './Landing.css'

const Landing = () => {
  return (
    <div className="landing-page">
      <SpaceHero />
      
      
      {/* Manifesto Blurb Section */}
      <section className="manifesto-blurb-section">
        <div className="container">
          <h2 className="manifesto-blurb-title">The Problem</h2>
          
          <div className="manifesto-blurb-content">
            <p>
              Space is a tech industry now--completely overrun by <span className="highlight">giants of infinite resources who govern space exclusively.</span>
            </p>
            
            <p>
              We want to change this. Making space accessible, to everyone, forever, is our mission. Current space access is limited to massive corporations and government agencies, while traditional satellite development costs $10M+ per mission.
            </p>
            
            <div className="read-more-container">
              <Link 
                to="/business-model" 
                className="read-more-btn"
                onClick={() => {
                  setTimeout(() => window.scrollTo(0, 0), 100)
                }}
              >
                Read Our Full Manifesto →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <h2 className="solution-title">Our Solution</h2>
          <p className="solution-subtitle">Modular Space Systems Designed for Democratized Access</p>
          
          <div className="solution-content">
            <div className="solution-text">
              <p>
                We believe modular space systems are the answer. <span className="highlight">Modular space systems enable shared infrastructure and reduced costs,</span> democratizing access to orbital research capabilities.
              </p>
              
              <p>
                Our goal is simple: innovate to utilize space sustainably. Making space accessible, to everyone, forever, is our mission.
              </p>
              
              <Link to="/technology" className="explore-tech-btn">
                Explore Our Technology →
              </Link>
            </div>
            
            <div className="solution-preview">
              <div className="stl-preview-grid">
                <div className="stl-preview-item">
                  <h4>Modular Connector</h4>
                  <p>Self-aligning, recyclable interface system</p>
                </div>
                <div className="stl-preview-item">
                  <h4>Precision Gimbal</h4>
                  <p>Multi-axis control with sub-degree accuracy</p>
                </div>
                <div className="stl-preview-item">
                  <h4>Docking Port</h4>
                  <p>Automated rendezvous and capture system</p>
                </div>
                <div className="stl-preview-item">
                  <h4>Hub Core</h4>
                  <p>Central processing and control unit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default Landing
