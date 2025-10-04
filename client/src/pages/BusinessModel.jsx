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
import './BusinessModel.css'

const BusinessModel = () => {
  return (
    <div className="business-model-page">
      <div className="container">
        <header className="page-header">
          <h1>Our Business Model</h1>
          <p className="page-subtitle">
            Understanding how we make space research accessible and affordable
          </p>
        </header>
        
        <section className="problem-section">
          <h2>The Problem</h2>
          <p className="section-intro">
            Educational institutions and research organizations face significant barriers to accessing space 
            research capabilities due to high costs and complex infrastructure requirements.
          </p>
          
          <div className="problem-grid">
            <div className="problem-card">
              <div className="icon-wrapper">
                <FaDollarSign />
              </div>
              <h3>High Development Costs</h3>
              <p>
                Traditional satellite development costs $10M+ for a full mission, 
                making space research inaccessible to smaller institutions and universities.
              </p>
            </div>
            
            <div className="problem-card">
              <div className="icon-wrapper">
                <FaThermometerHalf />
              </div>
              <h3>Complex Space Operations</h3>
              <p>
                Managing thermal extremes, orbital debris protection, and orbital 
                degradation requires specialized expertise and infrastructure.
              </p>
            </div>
            
            <div className="problem-card">
              <div className="icon-wrapper">
                <FaCog />
              </div>
              <h3>Long Development Timelines</h3>
              <p>
                Traditional satellite development takes 2-5 years from concept to 
                launch, significantly delaying research timelines.
              </p>
            </div>
            
            <div className="problem-card">
              <div className="icon-wrapper">
                <FaUsers />
              </div>
              <h3>Limited Access</h3>
              <p>
                Only large institutions and government agencies can afford the 
                infrastructure needed for space research, limiting innovation.
              </p>
            </div>
          </div>
        </section>
        
        <section className="solution-section">
          <h2>Our Solution</h2>
          <p className="section-intro">
            LEO Satellite Hub provides a modular, affordable platform that enables 
            educational institutions to conduct meaningful space research without 
            the traditional barriers.
          </p>
          
          <div className="solution-grid">
            <div className="solution-card">
              <div className="icon-wrapper">
                <FaSatellite />
              </div>
              <h3>Centralized Orbital Hub</h3>
              <p>
                Our modular hub provides shared infrastructure including power, 
                communication, and orbital maintenance systems.
              </p>
            </div>
            
            <div className="solution-card">
              <div className="icon-wrapper">
                <FaCheckCircle />
              </div>
              <h3>Standardized Integration</h3>
              <p>
                Plug-and-play module system allows researchers to focus on their 
                science without worrying about spacecraft engineering.
              </p>
            </div>
            
            <div className="solution-card">
              <div className="icon-wrapper">
                <FaShieldAlt />
              </div>
              <h3>Shared Protection</h3>
              <p>
                Built-in thermal management and debris protection systems 
                ensure mission success and longevity.
              </p>
            </div>
            
            <div className="solution-card">
              <div className="icon-wrapper">
                <FaRocket />
              </div>
              <h3>Reduced Time-to-Orbit</h3>
              <p>
                Launch ready in months instead of years, enabling rapid 
                research deployment and iteration.
              </p>
            </div>
          </div>
          
          <div className="architecture-diagram">
            <h3>Hub-and-Modules Architecture</h3>
            <div className="diagram" aria-label="Hub-and-modules architecture diagram showing central hub with multiple research modules">
              <svg viewBox="0 0 600 300" className="diagram-svg">
                {/* Central Hub */}
                <circle cx="300" cy="150" r="40" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3"/>
                <text x="300" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">HUB</text>
                
                {/* Research Modules */}
                <circle cx="150" cy="80" r="25" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="150" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Module A</text>
                
                <circle cx="450" cy="80" r="25" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="450" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Module B</text>
                
                <circle cx="150" cy="220" r="25" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="150" y="225" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Module C</text>
                
                <circle cx="450" cy="220" r="25" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="450" y="225" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Module D</text>
                
                {/* Connection Lines */}
                <line x1="175" y1="95" x2="260" y2="135" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5"/>
                <line x1="425" y1="95" x2="340" y2="135" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5"/>
                <line x1="175" y1="205" x2="260" y2="165" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5"/>
                <line x1="425" y1="205" x2="340" y2="165" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5"/>
                
                {/* Labels */}
                <text x="300" y="50" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">Central Orbital Hub</text>
                <text x="100" y="35" textAnchor="middle" fill="#374151" fontSize="12">Research</text>
                <text x="100" y="50" textAnchor="middle" fill="#374151" fontSize="12">Modules</text>
                
                <text x="300" y="280" textAnchor="middle" fill="#6b7280" fontSize="12">Modular, Scalable, Shared Infrastructure</text>
              </svg>
            </div>
            <figcaption className="diagram-caption">
              Our hub-and-modules architecture enables multiple research institutions to share 
              orbital infrastructure while maintaining independent research capabilities.
            </figcaption>
          </div>
        </section>
        
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
            Our flexible pricing model ensures that space research is accessible 
            to institutions of all sizes.
          </p>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-tier-name">Basic</div>
              <div className="pricing-amount">$50K</div>
              <div className="pricing-period">per mission</div>
              
              <ul className="pricing-features">
                <li><FaCheckCircle /> Single module slot</li>
                <li><FaCheckCircle /> 6-month mission duration</li>
                <li><FaCheckCircle /> Basic telemetry data</li>
                <li><FaCheckCircle /> Email support</li>
                <li><FaCheckCircle /> Standard orbital insertion</li>
              </ul>
              
              <Link to="/contact" className="pricing-cta">Get Started</Link>
            </div>
            
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-tier-name">Professional</div>
              <div className="pricing-amount">$150K</div>
              <div className="pricing-period">per mission</div>
              
              <ul className="pricing-features">
                <li><FaCheckCircle /> Up to 3 module slots</li>
                <li><FaCheckCircle /> 12-month mission duration</li>
                <li><FaCheckCircle /> Advanced data analytics</li>
                <li><FaCheckCircle /> Priority support</li>
                <li><FaCheckCircle /> Custom orbital parameters</li>
                <li><FaCheckCircle /> Mission planning assistance</li>
              </ul>
              
              <Link to="/contact" className="pricing-cta">Contact Sales</Link>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-tier-name">Enterprise</div>
              <div className="pricing-amount">$500K+</div>
              <div className="pricing-period">per mission</div>
              
              <ul className="pricing-features">
                <li><FaCheckCircle /> Unlimited module slots</li>
                <li><FaCheckCircle /> Extended mission duration</li>
                <li><FaCheckCircle /> Custom module development</li>
                <li><FaCheckCircle /> Dedicated support team</li>
                <li><FaCheckCircle /> Personalized orbit options</li>
                <li><FaCheckCircle /> Advanced mission control</li>
                <li><FaCheckCircle /> Research collaboration tools</li>
              </ul>
              
              <Link to="/contact" className="pricing-cta">Custom Quote</Link>
            </div>
          </div>
        </section>
        
        <section className="future-section">
          <h2>Future Expansion Plans</h2>
          <p className="section-intro">
            We're committed to expanding our platform and services to support 
            the growing demand for accessible space research capabilities.
          </p>
          
          <div className="roadmap-container">
            <div className="roadmap-item">
              <div className="phase-number">1</div>
              <div className="roadmap-content">
                <h3>Additional Hub Deployments</h3>
                <p>
                  Deploy additional hubs in different orbital inclinations and altitudes 
                  to support diverse research requirements and mission profiles.
                </p>
              </div>
            </div>
            
            <div className="roadmap-item">
              <div className="phase-number">2</div>
              <div className="roadmap-content">
                <h3>Specialized Modules</h3>
                <p>
                  Develop specialized modules for imaging, communications, scientific 
                  instruments, and technology demonstrations.
                </p>
              </div>
            </div>
            
            <div className="roadmap-item">
              <div className="phase-number">3</div>
              <div className="roadmap-content">
                <h3>Personalized Orbits</h3>
                <p>
                  Offer custom orbital configurations and mission profiles tailored 
                  to specific research objectives and requirements.
                </p>
              </div>
            </div>
            
            <div className="roadmap-item">
              <div className="phase-number">4</div>
              <div className="roadmap-content">
                <h3>Inter-Hub Network</h3>
                <p>
                  Establish communication networks between hubs to enable coordinated 
                  research missions and data sharing.
                </p>
              </div>
            </div>
          </div>
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
