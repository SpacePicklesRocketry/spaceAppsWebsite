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
          <h2 className="manifesto-blurb-title">the problem</h2>
          
          <div className="manifesto-blurb-content">
            <p>
              space is a tech industry now--completely overrun by <span className="highlight">giants of infinite resources who govern space exclusively.</span>
            </p>
            
            <p>
              we want to change this. making space accessible, to everyone, forever, is our mission. current space access is limited to massive corporations and government agencies, while traditional satellite development costs $10M+ per mission.
            </p>
            
            <div className="read-more-container">
              <Link 
                to="/business-model" 
                className="read-more-btn"
                onClick={() => window.scrollTo(0, 0)}
              >
                read our full manifesto →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <h2 className="solution-title">our solution</h2>
          <p className="solution-subtitle">modular space systems designed for democratized access</p>
          
          <div className="solution-content">
            <div className="solution-text">
              <p>
                we believe modular space systems are the answer. <span className="highlight">modular space systems enable shared infrastructure and reduced costs,</span> democratizing access to orbital research capabilities.
              </p>
              
              <p>
                our goal is simple: innovate to utilize space sustainably. making space accessible, to everyone, forever, is our mission.
              </p>
              
              <Link to="/technology" className="explore-tech-btn">
                explore our technology →
              </Link>
            </div>
            
            <div className="solution-preview">
              <div className="stl-preview-grid">
                <div className="stl-preview-item">
                  <div className="stl-icon">[ICON]</div>
                  <h4>Modular Connector</h4>
                  <p>Self-aligning, recyclable interface system</p>
                </div>
                <div className="stl-preview-item">
                  <div className="stl-icon">[ICON]</div>
                  <h4>Precision Gimbal</h4>
                  <p>Multi-axis control with sub-degree accuracy</p>
                </div>
                <div className="stl-preview-item">
                  <div className="stl-icon">[ICON]</div>
                  <h4>Docking Port</h4>
                  <p>Automated rendezvous and capture system</p>
                </div>
                <div className="stl-preview-item">
                  <div className="stl-icon">[ICON]</div>
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
