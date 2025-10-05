import React, { useState, useEffect } from 'react';
import STLViewer from './STLViewer';
import './SpaceHero.css';

const SpaceHero = ({ title = "Voxel Space", subtitle = "Modular space homes that are affordable" }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const words = ['affordable', 'repairable', 'recoverable'];
  const baseText = 'Modular space homes that are ';

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setTypewriterText(baseText + words[0]);
      return;
    }

    let timeout;
    const currentWord = words[currentWordIndex];
    
    if (isTyping) {
      // Typing effect
      if (typewriterText.length < baseText.length + currentWord.length) {
        timeout = setTimeout(() => {
          setTypewriterText(prev => {
            if (prev.length < baseText.length) {
              return baseText.slice(0, prev.length + 1);
            } else {
              return baseText + currentWord.slice(0, prev.length - baseText.length + 1);
            }
          });
        }, 100);
      } else {
        // Finished typing, wait then start backspacing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Backspacing effect
      if (typewriterText.length > baseText.length) {
        timeout = setTimeout(() => {
          setTypewriterText(prev => prev.slice(0, -1));
        }, 50);
      } else {
        // Finished backspacing, move to next word
        setCurrentWordIndex(prev => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, isTyping, currentWordIndex, reducedMotion, baseText, words]);

  const handleScrollToNext = () => {
    // Find the next section after the hero
    const heroSection = document.querySelector('.space-hero');
    const nextSection = heroSection?.nextElementSibling;
    
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll down one viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
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
      <div className="stl-hero-container">
        <STLViewer
          modelPath="/models/full.stl"
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
        <p className="space-hero-subtitle">
          {typewriterText}
          <span className="typewriter-cursor">|</span>
        </p>
      </div>

    </section>
  );
};

export default SpaceHero;
