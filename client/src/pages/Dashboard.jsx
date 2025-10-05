import './Dashboard.css'
import { useState, useEffect, lazy, Suspense } from 'react'

const SpaceAppsDashboard = lazy(() => import('./SpaceAppsUI/data_display/src/App.jsx'))

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userType, setUserType] = useState(null) // null, 'consumer', or 'company'
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleUserTypeSelect = (type) => {
    setUserType(type)
    setShowDashboard(true)
  }

  const handleBackToSelection = () => {
    setUserType(null)
    setShowDashboard(false)
  }

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          Loading dashboard...
        </div>
      </div>
    )
  }

  if (!showDashboard) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <header className="dashboard-header">
            <h1>Mission Control Dashboard</h1>
            <p>
              Access real-time satellite hub operations and monitoring capabilities
            </p>
          </header>
          
          <section className="dashboard-selection">
            <div className="selection-content">
              <h2>Choose Access Level</h2>
              <p className="selection-description">
                Select your access level to view the appropriate dashboard interface
              </p>
              <div className="access-buttons">
                <button className="access-btn consumer-btn" onClick={() => handleUserTypeSelect('consumer')}>
                  Consumer Login
                </button>
                <button className="access-btn company-btn" onClick={() => handleUserTypeSelect('company')}>
                  Company Login
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>{userType === 'consumer' ? 'Consumer Dashboard' : 'Company Dashboard'}</h1>
              <p>
                {userType === 'consumer' 
                  ? 'Monitor your assigned module and mission data'
                  : 'Full operational control and multi-module monitoring'
                }
              </p>
            </div>
            <button className="back-button" onClick={handleBackToSelection}>
              ← Change Access Level
            </button>
          </div>
        </div>
      </header>
      
      <section className="dashboard-content">
        <div className={`dashboard-container`}>
          <div className="spaceapps-embed">
            <Suspense
              fallback={
                <div className="dashboard-loading">
                  <div className="loading-spinner"></div>
                  Loading dashboard...
                </div>
              }
            >
              <SpaceAppsDashboard userType={userType} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
