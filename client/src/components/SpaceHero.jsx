import React, { useState, useEffect } from 'react';
import STLViewer from './STLViewer';
import './SpaceHero.css';

const SpaceHero = ({ title = "Space Innovation", subtitle = "Explore the future of aerospace technology" }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleScrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="space-hero" role="banner" aria-label="Space hero section">
      {/* Space Background - Stars removed, keeping only geometric decorations */}
      <div className="space-background">
        {/* Geometric Decorations */}
        <div className="orbit-ring"></div>
        <div className="tech-grid"></div>
      </div>

      {/* STL Viewer Container */}
      <div className={`stl-hero-container ${hasMounted ? 'stl-fly-in' : ''}`}>
        <STLViewer
          modelPath="/models/test.stl"
          autoRotate={true}
          autoRotateSpeed={0.3}
          scale={0.012}
          cameraPosition={[0, -10, 8]}
          color="#06b6d4"
          metalness={0.6}
          roughness={0.3}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Text Content */}
      <div className="space-hero-content">
        <h1 className="space-hero-title">{title}</h1>
        <p className="space-hero-subtitle">{subtitle}</p>
      </div>

      {/* Scroll Indicator */}
      <button 
        className="scroll-indicator"
        onClick={handleScrollToNext}
        aria-label="Scroll to next section"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>
    </section>
  );
};

export default SpaceHero;
