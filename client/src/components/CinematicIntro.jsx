import { useState, useEffect } from 'react'
import './CinematicIntro.css'
import STLViewer from './STLViewer'

const CinematicIntro = ({ onComplete, showScrollButton = true }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showHero, setShowHero] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const steps = [
    { text: "Welcome to", delay: 800 },
    { text: "LEO Satellite Hub", delay: 1200 },
    { text: "Affordable space research platform for educational institutions", delay: 1500 }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // Show hero content after intro
        setShowHero(true)
        // Set showScroll after STL animation completes (~2200ms after currentStep becomes 2)
        setTimeout(() => {
          setShowScroll(true)
        }, 2200)
        setTimeout(() => {
          onComplete?.()
        }, 1000)
      }
    }, steps[currentStep]?.delay || 0)

    return () => clearTimeout(timer)
  }, [currentStep, onComplete])

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="cinematic-hero">
      <div className="cinematic-background">
        {/* Animated starfield */}
        <div className="starfield">
          {Array.from({ length: window.innerWidth < 768 ? 100 : 200 }).map((_, i) => (
            <div 
              key={i} 
              className="star" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating geometric shapes */}
        <div className="geometric-shapes">
          <div className="satellite-shape"></div>
          <div className="orbit-ring"></div>
          <div className="tech-grid"></div>
        </div>
        
        {/* 3D STL Model */}
        {currentStep >= 1 && (
          <div className={`stl-container ${currentStep === 2 ? 'stl-fly-in' : ''}`}>
            <STLViewer
              modelPath="/models/test.stl"
              autoRotate={true}
              autoRotateSpeed={0.3}
              scale={0.015}
              cameraPosition={[0, 0, 8]}
              color="#06b6d4"
              metalness={0.6}
              roughness={0.3}
              className="stl-canvas"
              reducedMotion={prefersReducedMotion}
            />
          </div>
        )}
      </div>
      
      <div className="cinematic-content">
        <div className="hero-text-container">
          {currentStep < 2 && (
            <h1 className={`hero-title ${currentStep < 2 ? 'animate-in' : ''}`}>
              {steps[currentStep]?.text}
            </h1>
          )}
          
          {currentStep === 2 && (
            <div className="hero-subtitle animate-in">
              <p>{steps[currentStep]?.text}</p>
            </div>
          )}
          
          {showScroll && (
            <div className="hero-actions animate-in">
              <button className="scroll-down-btn" onClick={handleScrollDown}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {showHero && (
          <div className="hero-progress">
            <div className="progress-indicator">
              <div className="progress-dot active"></div>
              <div className="progress-dot"></div>
              <div className="progress-dot"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CinematicIntro
