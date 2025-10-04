import './Dashboard.css'
import { useState, useEffect } from 'react'

const Dashboard = () => {
  // Simulate loading state for demonstration
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="dashboard-page">
      <div className="container">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>
            Monitor and manage your satellite hub operations
          </p>
        </header>
        
        <section className="dashboard-content">
          <div className="dashboard-placeholder">
            <h2>NPM Dashboard Integration</h2>
            <p>
              The existing NPM dashboard will be integrated here to provide 
              real-time monitoring and control capabilities for your satellite hub.
            </p>
            
            <div className={`dashboard-container ${isLoading ? 'skeleton' : ''}`}>
              {isLoading ? (
                <div className="skeleton-content">
                  <div className="skeleton skeleton-text skeleton-text-lg"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text"></div>
                </div>
              ) : (
                <>
                  <p>NPM Dashboard will be embedded here</p>
                  <p>This will include:</p>
                  <ul>
                    <li>Real-time telemetry data</li>
                    <li>System status monitoring</li>
                    <li>Command and control interface</li>
                    <li>Data visualization tools</li>
                    <li>Alert and notification systems</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>
        
        <section className="dashboard-features">
          <h2>Dashboard Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Real-time Monitoring</h3>
              <p>Live data streams from your satellite hub</p>
            </div>
            <div className="feature-item">
              <h3>System Control</h3>
              <p>Remote control of satellite hub operations</p>
            </div>
            <div className="feature-item">
              <h3>Data Analytics</h3>
              <p>Comprehensive analysis of collected data</p>
            </div>
            <div className="feature-item">
              <h3>Alert Management</h3>
              <p>Automated alerts and notification system</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
