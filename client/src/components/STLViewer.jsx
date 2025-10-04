import { Canvas } from '@react-three/fiber'
import { OrbitControls, useProgress, Html } from '@react-three/drei'
import { Suspense } from 'react'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useLoader } from '@react-three/fiber'
import { ErrorBoundary } from 'react-error-boundary'
import './STLViewer.css'

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
  className = ''
}) {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: fov }}
      className={className}
      shadows
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loader />}>
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
            enableZoom={true}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            enablePan={true}
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
