import { Link } from 'react-router-dom'
import { useEffect } from 'react'
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
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="business-model-page">
      <div className="container">
        <section className="manifesto-section">
          <h1 className="manifesto-title">Voxel Space Manifesto</h1>
          <p className="manifesto-author">written by the voxel space team.</p>

          <div className="manifesto-content">
            <p>
              Our goal is simple: <span className="highlight">innovate to utilize space sustainably.</span>
            </p>

            <p>
              It's obvious, space is a tech industry now--completely overrun by Low Earth Orbits(LEOs) from giants of infinite resources who govern space exclusively.
            </p>

            <p>
              We want to change this. Making space accessible, to everyone, forever, is our mission.
            </p>


            <ul className="manifesto-list">
              <li>
                Current space access is limited to <span className="highlight">massive corporations and government agencies</span> with unlimited resources.
              </li>
              <li>
                Traditional satellite development costs <span className="highlight">$10M+ per mission</span>, making space research difficult for universities and smaller institutions.
              </li>
              <li>
                Modular space systems enable <span className="highlight">shared infrastructure and reduced costs</span>, democratizing access to orbital research capabilities.
              </li>
            </ul>


            <p>
              We're a team wanting to reach for the stars, literally.
            </p>
          </div>
          
        </section>

      </div>

      <section className="solution-section">
        <div className="container">
          <h2>Our Solution: Research Modules</h2>
          <div className="solution-stl-container">
            <AnnotatedSTLViewer
              modelPath="/models/full.stl"
              annotations={[
                {
                  position: [0.5 ,0.9,3],
                  label: "Solar Panel",
                  link: "/technology"
                },
                {
                  position: [-0.2,1.75,0.1],
                  label: "Research Module",
                  link: "/technology"
                },
                {
                  position: [-0.7,1,-1],
                  label: "Gimballed Thruster",
                  link: "/technology"
                },
                {
                  position: [1.2, 0.5, 0.5],
                  label: "Shield",
                  link: "/technology"
                }
              ]}
              autoRotate={false}
              autoRotateSpeed={0.3}
              scale={0.007}
              color="#06b6d4"
            />
          </div>

          <div className="solution-descriptions">
            <div className="description-item">
              <h4>Designed for Researchers</h4>
              <p>Our central hub provides shared infrastructure that dramatically reduces costs for individual research modules while delivering essential data and operational support.</p>
            </div>
            <div className="description-item">
              <h4>Cost Reduction Through Shared Systems</h4>
              <p>Solar panels, thrusters, and shields are shared across all modules, eliminating redundant hardware costs and reducing operational expenses by up to 70%.</p>
            </div>
            <div className="description-item">
              <h4>Space Debris Protection</h4>
              <p>Advanced shielding and precision thrusters help avoid space debris collisions, protecting valuable research equipment and ensuring mission continuity.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">

        <section className="pricing-section">
          <h2>Diversified Revenue Streams</h2>
          <p className="section-intro">
            Voxel Space’s modular pricing blends recurring and one-time revenue streams for scalability and strong margins. Recurring income comes from power, sensor access, and insurance, while one-time payments cover hardware and payload weight. This flexible model maximizes customer adoption and ensures predictable, diversified revenue growth.space
              </p>

          <div className="revenue-streams-container">
            <div className="revenue-table">
              <div className="revenue-header">
                <div className="revenue-cell header">Feature</div>
                <div className="revenue-cell header">Base</div>
                <div className="revenue-cell header">Add-ons</div>
              </div>
              
              <div className="revenue-row">
                <div className="revenue-cell feature">Hardware Acquisition</div>
                <div className="revenue-cell base selected">Renting hardware</div>
                <div className="revenue-cell addon">Buying hardware</div>
              </div>
              
              <div className="revenue-row">
                <div className="revenue-cell feature">Power Limit</div>
                <div className="revenue-cell base">300W limit</div>
                <div className="revenue-cell addon selected">500W limit</div>
              </div>
              
              <div className="revenue-row">
                <div className="revenue-cell feature">Weight</div>
                <div className="revenue-cell base selected">Standard weight</div>
                <div className="revenue-cell addon">Overweight (+$8k/kg)</div>
              </div>
              
              <div className="revenue-row">
                <div className="revenue-cell feature">Sensors</div>
                <div className="revenue-cell base selected">Payload sensors</div>
                <div className="revenue-cell addon">Hub sensor utilization</div>
              </div>
              
              <div className="revenue-row">
                <div className="revenue-cell feature">Insurance</div>
                <div className="revenue-cell base">Payload uninsured</div>
                <div className="revenue-cell addon selected">Payload insurance</div>
              </div>
            </div>

          </div>
        </section>
        
        <section className="cta-section-final">
          <div className="cta-content">
            <h2>Ready to Launch Your Research?</h2>
            <p>
              See what data we can provide for your research:
            </p>
            <div className="cta-buttons">
              <Link to="/dashboard" className="cta-button">
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
