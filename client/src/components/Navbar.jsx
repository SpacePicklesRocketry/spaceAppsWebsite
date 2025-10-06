import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
  }, [isMobileMenuOpen])
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-logo">
              Voxel Space
            </Link>
            
            <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <Link to="/" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/business-model" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>Business Model</Link>
              <Link to="/technology" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>Technology</Link>
              <Link to="/dashboard" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            </div>
            
            <button 
              className="mobile-menu-btn" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="nav-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}

export default Navbar
