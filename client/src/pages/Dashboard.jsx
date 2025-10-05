import './Dashboard.css'
import { useState, useEffect, lazy, Suspense } from 'react'

const SpaceAppsDashboard = lazy(() => import('./SpaceAppsUI/data_display/src/App.jsx'))

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
            <h2>Operations Dashboard</h2>
            <p>
              Real-time monitoring and control capabilities for your satellite hub.
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
                <div className="spaceapps-embed">
                  <Suspense
                    fallback={
                      <div className="dashboard-loading">
                        <div className="loading-spinner"></div>
                        Loading dashboard...
                      </div>
                    }
                  >
                    <SpaceAppsDashboard />
                  </Suspense>
                </div>
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
