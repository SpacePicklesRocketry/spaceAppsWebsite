import { Canvas } from '@react-three/fiber'
import { OrbitControls, useProgress, Html } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useLoader, useFrame } from '@react-three/fiber'
import { ErrorBoundary } from 'react-error-boundary'
import { SphereGeometry, PointsMaterial, BufferGeometry, Float32BufferAttribute } from 'three'
import { useNavigate } from 'react-router-dom'
import './AnnotatedSTLViewer.css'

// Space background with moving stars
function SpaceBackground() {
  const starsRef = useRef()
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005
      starsRef.current.rotation.x += 0.0002
    }
  })

  const starCount = 2000
  const positions = new Float32Array(starCount * 3)
  
  for (let i = 0; i < starCount; i++) {
    const radius = 30 + Math.random() * 40
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.6}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation={false}
      />
    </points>
  )
}

// Annotation component
function Annotation({ position, label, description, onClick, isVisible, animationsEnabled = true }) {
  return (
    <Html position={position} center>
      <div 
        className={`annotation ${isVisible ? 'visible' : ''} ${animationsEnabled ? 'animated' : 'static'}`}
        onClick={onClick}
      >
        <div className="annotation-marker">
          {animationsEnabled && <div className="annotation-pulse"></div>}
          <div className="annotation-dot"></div>
        </div>
        <div className="annotation-label">{label}</div>
        <div className="annotation-description">{description}</div>
      </div>
    </Html>
  )
}

// Model component
function Model({ modelPath, scale = 0.02, color = "#06b6d4", metalness = 0.3, roughness = 0.4 }) {
  const geometry = useLoader(STLLoader, modelPath)
  
  geometry.computeBoundingBox()
  const boundingBox = geometry.boundingBox
  const centerX = (boundingBox.max.x + boundingBox.min.x) / 2
  const centerY = (boundingBox.max.y + boundingBox.min.y) / 2
  const centerZ = (boundingBox.max.z + boundingBox.min.z) / 2
  
  return (
    <mesh 
      geometry={geometry} 
      scale={scale}
      castShadow 
      receiveShadow
      position={[-centerX * scale, -centerY * scale, -centerZ * scale]}
    >
      <meshStandardMaterial 
        color={color} 
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  )
}

// Loading component
function Loader() {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="loading-overlay">
        <div className="spinner" />
        Loading 3D Model... {Math.round(progress)}%
      </div>
    </Html>
  )
}

// Error fallback component
function ErrorFallback() {
  return (
    <Html center>
      <div style={{background:'rgba(255,255,255,0.9)', padding: 16, borderRadius: 8, color: '#ef4444'}}>
        Failed to load 3D model. Please check the file path.
      </div>
    </Html>
  )
}

// Main AnnotatedSTLViewer component
function AnnotatedSTLViewer({ 
  modelPath, 
  annotations = [],
  autoRotate = true, 
  scale = 0.02, 
  cameraPosition = [0, 0, 5],
  fov = 50,
  autoRotateSpeed = 0.3,
  color = "#06b6d4",
  metalness = 0.3,
  roughness = 0.4,
  className = '',
  reducedMotion = false
}) {
  const canvasRef = useRef()
  const navigate = useNavigate()
  const [visibleAnnotations, setVisibleAnnotations] = useState(new Set(annotations.map((_, index) => index)))
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        
        const renderer = canvas._gl
        if (renderer) {
          const width = canvas.clientWidth
          const height = canvas.clientHeight
          renderer.setSize(width, height, false)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleAnnotationClick = (annotation) => {
    if (annotation.link) {
      navigate(annotation.link)
    }
  }

  return (
    <div className="annotated-stl-container">
      <button 
        className="animation-toggle"
        onClick={() => setAnimationsEnabled(!animationsEnabled)}
        title={animationsEnabled ? "Disable animations" : "Enable animations"}
      >
        {animationsEnabled ? "⏸️" : "▶️"}
      </button>
      
      <Canvas
        ref={canvasRef}
        camera={{ position: cameraPosition, fov: fov }}
        className={`annotated-stl-canvas ${className}`}
        shadows
        dpr={[1, 1.5]}
        style={{ 
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <SpaceBackground />
            
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.4} />
            <directionalLight position={[-5, 5, 5]} intensity={0.4} />
            <directionalLight position={[0, -5, 5]} intensity={0.3} />
            
            <Model 
              modelPath={modelPath} 
              scale={scale} 
              color={color}
              metalness={metalness}
              roughness={roughness}
            />
            
            {animationsEnabled && annotations.map((annotation, index) => (
              <Annotation
                key={index}
                position={annotation.position}
                label={annotation.label}
                description={annotation.description}
                onClick={() => handleAnnotationClick(annotation)}
                isVisible={visibleAnnotations.has(index)}
                animationsEnabled={animationsEnabled}
              />
            ))}
            
            <OrbitControls
              enableZoom={false}
              autoRotate={autoRotate && !reducedMotion && animationsEnabled}
              autoRotateSpeed={autoRotateSpeed}
              enablePan={false}
              enableRotate={true}
              rotateSpeed={0.5}
              minDistance={2}
              maxDistance={10}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
    </div>
  )
}

export default AnnotatedSTLViewer
