import { Canvas } from '@react-three/fiber'
import { OrbitControls, useProgress, Html } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useLoader, useFrame } from '@react-three/fiber'
import { ErrorBoundary } from 'react-error-boundary'
import { SphereGeometry, PointsMaterial, BufferGeometry, Float32BufferAttribute } from 'three'
import './STLViewer.css'

// Space background with moving stars
function SpaceBackground() {
  const starsRef = useRef()
  
  useFrame((state) => {
    if (starsRef.current) {
      // Rotate the starfield slowly to create movement
      starsRef.current.rotation.y += 0.0005
      starsRef.current.rotation.x += 0.0002
    }
  })

  // Generate random star positions - more stars for better coverage
  const starCount = 3000
  const positions = new Float32Array(starCount * 3)
  
  for (let i = 0; i < starCount; i++) {
    // Create a sphere of stars around the scene
    const radius = 40 + Math.random() * 60
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
        size={0.8}
        color="#ffffff"
        transparent
        opacity={0.9}
        sizeAttenuation={false}
      />
    </points>
  )
}

// Error fallback component for ErrorBoundary
function ErrorFallback() {
  return (
    <Html center>
      <div style={{background:'rgba(255,255,255,0.9)', padding: 16, borderRadius: 8, color: '#ef4444'}}>
        Failed to load 3D model. Please check the file path.
      </div>
    </Html>
  )
}

// Model component that loads and displays the STL file
function Model({ modelPath, scale = 0.02, color = "#1e40af", metalness = 0.3, roughness = 0.4 }) {
  const geometry = useLoader(STLLoader, modelPath)
  
  // Calculate bounding box to center the model
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

// Loading component with progress indicator
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

// Main STLViewer component
function STLViewer({ 
  modelPath, 
  autoRotate = true, 
  scale = 0.02, 
  cameraPosition = [0, 0, 5],
  fov = 50,
  autoRotateSpeed = 0.5,
  color = "#1e40af",
  metalness = 0.3,
  roughness = 0.4,
  className = '',
  reducedMotion = false
}) {
  const canvasRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Force canvas to recalculate its size
        const canvas = canvasRef.current
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        
        // Force Three.js to resize
        const renderer = canvas._gl
        if (renderer) {
          const width = canvas.clientWidth
          const height = canvas.clientHeight
          renderer.setSize(width, height, false)
        }
      }
    }

    // Initial resize with delay to ensure DOM is ready
    setTimeout(handleResize, 100)
    
    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: cameraPosition, fov: fov }}
      className={className}
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
          {/* Space background with moving stars */}
          <SpaceBackground />
          
          {/* Even lighting setup */}
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
          
          <OrbitControls
            enableZoom={false}
            autoRotate={autoRotate && !reducedMotion}
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
  )
}

export default STLViewer
