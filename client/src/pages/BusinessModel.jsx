import { Link } from 'react-router-dom'
import {
  FaRocket,
  FaDollarSign,
  FaShieldAlt,
  FaThermometerHalf,
  FaCheckCircle,
  FaSatellite,
  FaExpand,
  FaCog,
  FaUsers,
  FaChartLine
} from 'react-icons/fa'
import AnnotatedSTLViewer from '../components/AnnotatedSTLViewer'
import './BusinessModel.css'

const BusinessModel = () => {
  return (
    <div className="business-model-page">
      <div className="container">
        <section className="manifesto-section">
          <h1 className="manifesto-title">astro lab manifesto</h1>
          <p className="manifesto-author">written by the <Link to="/team" className="team-link">astro lab team</Link>.</p>

          <div className="manifesto-content">
            <p>
              our goal is simple: <span className="highlight">innovate to utilize space sustainably.</span>
            </p>

            <p>
              it's obvious, space is a tech industry now--completely overrun by Low Earth Orbits(LEOs) from giants of infinite resources who govern space exclusively.
            </p>

            <p>
              we want to change this. making space accessible, to everyone, forever, is our mission.
            </p>


            <ul className="manifesto-list">
              <li>
                current space access is limited to <span className="highlight">massive corporations and government agencies</span> with unlimited resources.
              </li>
              <li>
                traditional satellite development costs <span className="highlight">$10M+ per mission</span>, making space research impossible for universities and smaller institutions.
              </li>
              <li>
                modular space systems enable <span className="highlight">shared infrastructure and reduced costs</span>, democratizing access to orbital research capabilities.
              </li>
            </ul>


            <p>
              we're a team wanting to reach for the stars, literally.
            </p>
          </div>
          
          <div className="scroll-indicator">
            <div className="scroll-arrow">V</div>
          </div>
        </section>

      </div>

      <section className="solution-section">
        <div className="container">
          <h2>Our Solution: Research Modules</h2>
          <div className="solution-stl-container">
            <AnnotatedSTLViewer
              modelPath="/models/Connector.stl"
              annotations={[
                {
                  position: [2, 1, 0],
                  label: "Central Hub",
                  description: "Core infrastructure",
                  link: "/technology"
                },
                {
                  position: [-1.5, 0.8, 0],
                  label: "Power Module",
                  description: "Solar panels & batteries",
                  link: "/technology"
                },
                {
                  position: [1.5, -0.8, 0],
                  label: "Communication",
                  description: "Antenna & transceiver",
                  link: "/technology"
                },
                {
                  position: [-1, -1.2, 0],
                  label: "Research Module",
                  description: "Scientific instruments",
                  link: "/technology"
                },
                {
                  position: [0, 1.5, 0],
                  label: "Thermal Control",
                  description: "Heat management",
                  link: "/technology"
                }
              ]}
              autoRotate={true}
              autoRotateSpeed={0.3}
              scale={0.03}
              color="#06b6d4"
            />
          </div>

          <div className="solution-descriptions">
            <div className="description-item">
              <h4>Modular Design</h4>
              <p>Each component can be independently developed, tested, and replaced without affecting the entire system.</p>
            </div>
            <div className="description-item">
              <h4>Shared Infrastructure</h4>
              <p>Multiple research institutions can share the same orbital platform, dramatically reducing costs.</p>
            </div>
            <div className="description-item">
              <h4>Plug-and-Play Integration</h4>
              <p>Standardized interfaces allow researchers to focus on science rather than spacecraft engineering.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">

        <section className="business-model-section">
          <h2>Business Model</h2>
          <p className="section-intro">
            Our sustainable business model ensures long-term viability while making space research
            accessible to educational institutions worldwide.
          </p>

          <div className="business-model-content">
            <div className="business-model-grid">
              <div className="business-model-card">
                <h3>Revenue Model</h3>
                <ul>
                  <li>Mission-based pricing for module slots</li>
                  <li>Subscription services for ongoing support</li>
                  <li>Premium data analytics and reporting</li>
                  <li>Custom module development partnerships</li>
                </ul>
              </div>

              <div className="business-model-card">
                <h3>Utilization Strategy</h3>
                <ul>
                  <li>Multi-client hub sharing maximizes efficiency</li>
                  <li>Flexible mission durations (6-24 months)</li>
                  <li>Scalable infrastructure supports growth</li>
                  <li>Cross-institutional collaboration opportunities</li>
                </ul>
              </div>

              <div className="business-model-card">
                <h3>SLAs & Commitments</h3>
                <ul>
                  <li>99.5% uptime guarantee for hub operations</li>
                  <li>24/7 mission monitoring and support</li>
                  <li>Data backup and recovery protocols</li>
                  <li>Performance metrics and reporting</li>
                </ul>
              </div>

              <div className="business-model-card">
                <h3>Optional Add-ons</h3>
                <ul>
                  <li>Advanced mission planning tools</li>
                  <li>Custom data visualization dashboards</li>
                  <li>Research collaboration platforms</li>
                  <li>Educational content and training</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-section">
          <h2>Pricing & Offerings</h2>
          <p className="section-intro">
            [PRICING CONTENT PLACEHOLDER]
          </p>
        </section>
        
        <section className="cta-section-final">
          <div className="cta-content">
            <h2>Ready to Launch Your Research?</h2>
            <p>
              Join the growing community of institutions making space research accessible.
              Contact us to learn more about our platform and pricing options.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button">
                Get In Touch
              </Link>
              <Link to="/dashboard" className="cta-button-secondary">
                View Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BusinessModel
