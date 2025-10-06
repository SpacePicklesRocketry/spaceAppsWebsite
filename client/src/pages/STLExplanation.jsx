import React, { useState } from 'react';
import STLViewer from '../components/STLViewer';
import './STLExplanation.css';

const STLExplanation = () => {
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const componentsData = [
    {
      id: 'solar-panel-arm',
      name: 'Solar Panel Arm',
      modelPath: '/models/test.stl',
      shortDescription: 'Deployable solar panel arm system providing primary power generation for the satellite hub.',
      detailedDescription: 'The Solar Panel Arm is a precision-engineered deployment system that extends solar arrays to maximize power generation. It features controlled deployment mechanisms, sun-tracking capabilities, and robust construction to ensure reliable power supply throughout the mission.',
      technicalSpecs: {
        dimensions: '3.0m × 0.5m × 0.3m',
        mass: '85 kg',
        materials: 'Carbon fiber composite, Titanium joints, Solar cells',
        operationalTemp: '-50°C to +85°C',
        powerConsumption: '0.2 kW',
        powerGeneration: '2.5 kW peak'
      },
      features: [
        'Controlled deployment',
        'Sun-tracking capability',
        'High-efficiency solar cells',
        'Robust construction',
        'Redundant mechanisms'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Solar Array' },
        { position: { x: 70, y: 40 }, label: 'Deployment Joint' },
        { position: { x: 50, y: 60 }, label: 'Tracking Motor' }
      ],
      category: 'Systems'
    },
    {
      id: 'recovery-system',
      name: 'Recovery System',
      modelPath: '/models/test.stl',
      shortDescription: 'Automated recovery and retrieval system for satellite modules and payloads.',
      detailedDescription: 'The Recovery System enables automated capture and retrieval of satellite modules, payloads, and visiting spacecraft. It features precision guidance systems, secure capture mechanisms, and integrated handling capabilities for safe recovery operations.',
      technicalSpecs: {
        dimensions: '2.5m × 2.5m × 1.2m',
        mass: '200 kg',
        materials: 'Stainless steel, Composite panels, Precision actuators',
        operationalTemp: '-30°C to +80°C',
        powerConsumption: '1.8 kW',
        captureAccuracy: '±3mm precision'
      },
      features: [
        'Automated guidance',
        'Secure capture mechanism',
        'Payload handling',
        'Emergency release',
        'Multi-purpose design'
      ],
      annotations: [
        { position: { x: 40, y: 30 }, label: 'Capture Arms' },
        { position: { x: 60, y: 60 }, label: 'Guidance System' },
        { position: { x: 30, y: 70 }, label: 'Control Interface' }
      ],
      category: 'Systems'
    },
    {
      id: 'modules',
      name: 'Research Modules',
      modelPath: '/models/test.stl',
      shortDescription: 'Modular research payload containers for scientific experiments and data collection.',
      detailedDescription: 'Research Modules are standardized containers designed to house scientific instruments and experiments. They feature plug-and-play interfaces, environmental controls, and data collection capabilities, enabling rapid deployment of research payloads.',
      technicalSpecs: {
        dimensions: '1.0m × 1.0m × 0.8m',
        mass: '75 kg',
        materials: 'Aluminum alloy, Thermal insulation, Data interfaces',
        operationalTemp: '-40°C to +70°C',
        powerConsumption: '0.5 kW',
        payloadCapacity: '25 kg'
      },
      features: [
        'Standardized interface',
        'Environmental control',
        'Data collection',
        'Easy integration',
        'Modular design'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Payload Bay' },
        { position: { x: 70, y: 40 }, label: 'Data Interface' },
        { position: { x: 50, y: 60 }, label: 'Thermal Control' }
      ],
      category: 'Structure'
    },
    {
      id: 'hub',
      name: 'Central Hub',
      modelPath: '/models/test.stl',
      shortDescription: 'Central processing and control unit managing all satellite hub operations.',
      detailedDescription: 'The Central Hub serves as the core of the satellite system, housing main computer systems, power distribution, and communication interfaces. It coordinates all operations and ensures system reliability through redundant systems and fail-safe mechanisms.',
      technicalSpecs: {
        dimensions: '2.5m × 2.5m × 1.8m',
        mass: '450 kg',
        materials: 'Titanium alloy, Carbon fiber composite, Radiation shielding',
        operationalTemp: '-40°C to +85°C',
        powerConsumption: '2.5 kW',
        processingPower: 'Dual redundant processors'
      },
      features: [
        'Central processing unit',
        'Power distribution system',
        'Communication hub',
        'Thermal management',
        'Radiation protection'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Main Processor' },
        { position: { x: 70, y: 40 }, label: 'Power Distribution' },
        { position: { x: 50, y: 60 }, label: 'Comm Interface' }
      ],
      category: 'Structure'
    },
    {
      id: 'gimbal',
      name: 'Gimbal',
      modelPath: '/models/test.stl',
      shortDescription: 'Precision gimbal system providing multi-axis orientation control for antennas and instruments.',
      detailedDescription: 'The Gimbal System offers precise multi-axis orientation control with sub-degree accuracy. It enables optimal pointing of antennas, cameras, and scientific instruments, ensuring maximum performance for communication and data collection missions.',
      technicalSpecs: {
        dimensions: '1.2m × 1.2m × 0.6m',
        mass: '85 kg',
        materials: 'Aluminum alloy, Precision bearings, Stepper motors',
        operationalTemp: '-40°C to +70°C',
        powerConsumption: '0.8 kW',
        pointingAccuracy: '±0.1° in all axes'
      },
      features: [
        'Multi-axis control',
        'Sub-degree accuracy',
        'High torque capability',
        'Smooth operation',
        'Redundant drive systems'
      ],
      annotations: [
        { position: { x: 25, y: 30 }, label: 'Azimuth Motor' },
        { position: { x: 75, y: 50 }, label: 'Elevation Drive' },
        { position: { x: 50, y: 70 }, label: 'Control Electronics' }
      ],
      category: 'Systems'
    },
    {
      id: 'shield',
      name: 'Shield',
      modelPath: '/models/test.stl',
      shortDescription: 'Protective shielding system defending against space debris and radiation.',
      detailedDescription: 'The Shield System provides comprehensive protection against space debris, micrometeoroids, and radiation. It features multi-layer construction, impact absorption capabilities, and thermal management to ensure satellite safety and longevity.',
      technicalSpecs: {
        dimensions: '2.0m × 2.0m × 0.3m',
        mass: '120 kg',
        materials: 'Multi-layer composite, Radiation shielding, Impact foam',
        operationalTemp: '-50°C to +80°C',
        powerConsumption: '0.1 kW',
        protectionLevel: 'Military grade'
      },
      features: [
        'Multi-layer protection',
        'Impact absorption',
        'Radiation shielding',
        'Thermal management',
        'Modular design'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Outer Layer' },
        { position: { x: 70, y: 40 }, label: 'Impact Foam' },
        { position: { x: 50, y: 60 }, label: 'Radiation Shield' }
      ],
      category: 'Structure'
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      modelPath: '/models/test.stl',
      shortDescription: 'Real-time mission control interface for satellite operations and data visualization.',
      detailedDescription: 'The Dashboard provides comprehensive mission control capabilities with real-time telemetry, system monitoring, and data visualization. It enables operators to monitor satellite health, control subsystems, and analyze mission data through an intuitive web-based interface.',
      technicalSpecs: {
        dimensions: 'Virtual interface',
        mass: 'Software only',
        materials: 'Web-based application',
        operationalTemp: 'Ground-based operation',
        powerConsumption: 'Minimal client-side',
        updateRate: 'Real-time streaming'
      },
      features: [
        'Real-time telemetry',
        'System health monitoring',
        'Mission planning tools',
        'Data visualization',
        'Alert management'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Telemetry Display' },
        { position: { x: 70, y: 40 }, label: 'Control Panel' },
        { position: { x: 50, y: 60 }, label: 'Data Visualization' }
      ],
      category: 'Software'
    },
    {
      id: 'collision-avoidance',
      name: 'Collision Avoidance',
      modelPath: '/models/test.stl',
      shortDescription: 'Advanced sensor system for detecting and avoiding space debris and other satellites.',
      detailedDescription: 'The Collision Avoidance System uses multiple sensor technologies including radar, optical sensors, and AI-powered algorithms to detect potential collision threats. It provides early warning capabilities and automated avoidance maneuvers to protect the satellite from space debris.',
      technicalSpecs: {
        dimensions: '2.0m × 1.0m × 0.5m',
        mass: '95 kg',
        materials: 'Radar arrays, Optical sensors, AI processors',
        operationalTemp: '-40°C to +70°C',
        powerConsumption: '1.5 kW',
        detectionRange: '50km radius'
      },
      features: [
        'Multi-sensor detection',
        'AI threat assessment',
        'Automated avoidance',
        'Early warning system',
        'Real-time tracking'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Radar Array' },
        { position: { x: 70, y: 40 }, label: 'Optical Sensors' },
        { position: { x: 50, y: 60 }, label: 'AI Processor' }
      ],
      category: 'Systems'
    }
  ];

  const categories = ['all', 'Structure', 'Systems', 'Software'];
  
  // Always show all components - remove filtering
  const filteredComponents = componentsData;

  const handleComponentExpand = (componentId) => {
    setExpandedComponent(expandedComponent === componentId ? null : componentId);
  };

  const toggleSelection = (componentId) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(componentId)) {
        newSet.delete(componentId);
      } else {
        newSet.add(componentId);
      }
      return newSet;
    });
  };

  const scrollToComparison = () => {
    document.querySelector('.technical-specs').scrollIntoView({ behavior: 'smooth' });
  };

  const renderAnnotation = (annotation, index) => (
    <div
      key={index}
      className="annotation"
      style={{
        left: `${annotation.position.x}%`,
        top: `${annotation.position.y}%`
      }}
    >
      <div className="annotation-label">{annotation.label}</div>
    </div>
  );

  const renderComponentCard = (component) => {
    // Different settings based on component
    const getComponentSettings = (id) => {
      switch(id) {
        case 'solar-panel-arm':
          return { 
            scale: 0.8, 
            cameraPosition: [60, 60, 60], 
            color: "#ff6b6b",
            metalness: 0.6,
            roughness: 0.3
          };
        case 'recovery-system':
          return { 
            scale: 0.6, 
            cameraPosition: [70, 70, 70], 
            color: "#45b7d1",
            metalness: 0.5,
            roughness: 0.3
          };
        case 'modules':
          return { 
            scale: 0.7, 
            cameraPosition: [50, 50, 50], 
            color: "#4ecdc4",
            metalness: 0.4,
            roughness: 0.4
          };
        case 'hub':
          return { 
            scale: 0.4, 
            cameraPosition: [80, 80, 80], 
            color: "#9b59b6",
            metalness: 0.7,
            roughness: 0.2
          };
        case 'gimbal':
          return { 
            scale: 1.0, 
            cameraPosition: [60, 60, 60], 
            color: "#4ecdc4",
            metalness: 0.4,
            roughness: 0.4
          };
        case 'shield':
          return { 
            scale: 0.5, 
            cameraPosition: [70, 70, 70], 
            color: "#e74c3c",
            metalness: 0.6,
            roughness: 0.4
          };
        case 'dashboard':
          return { 
            scale: 0.3, 
            cameraPosition: [50, 50, 50], 
            color: "#2ecc71",
            metalness: 0.3,
            roughness: 0.6
          };
        case 'collision-avoidance':
          return { 
            scale: 0.6, 
            cameraPosition: [70, 70, 70], 
            color: "#f39c12",
            metalness: 0.5,
            roughness: 0.5
          };
        default:
          return { 
            scale: 0.1, 
            cameraPosition: [2, 2, 2], 
            color: "#06b6d4",
            metalness: 0.4,
            roughness: 0.3
          };
      }
    };
    
    const settings = getComponentSettings(component.id);
    
    return (
      <div
        key={component.id}
        className={`component-card ${expandedComponent === component.id ? 'expanded' : ''}`}
      >
        <div className="component-viewer">
          <STLViewer
            modelPath={component.modelPath}
            autoRotate={expandedComponent === component.id}
            scale={settings.scale}
            cameraPosition={settings.cameraPosition}
            fov={50}
            autoRotateSpeed={0.8}
            color={settings.color}
            metalness={settings.metalness}
            roughness={settings.roughness}
            className="component-canvas"
          />
        <div className="annotations-container">
          {component.annotations.map((annotation, index) => renderAnnotation(annotation, index))}
        </div>
      </div>
      
      <div className="component-header">
        <h3 className="component-name">{component.name}</h3>
      </div>
      
      <p className="component-description">{component.shortDescription}</p>
      
      <button
        className="view-details-btn"
        onClick={() => handleComponentExpand(component.id)}
      >
        {expandedComponent === component.id ? 'Close Details' : 'View Details'}
      </button>
      
      {expandedComponent === component.id && (
        <div className="component-details">
          <div className="detailed-description">
            <h4>Detailed Description</h4>
            <p>{component.detailedDescription}</p>
          </div>
          
          <div className="technical-specs-table">
            <h4>Technical Specifications</h4>
            <table>
              <tbody>
                {Object.entries(component.technicalSpecs).map(([key, value]) => (
                  <tr key={key} className="spec-row">
                    <td className="spec-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="features-list">
            <h4>Key Features</h4>
            <ul>
              {component.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    );
  };

  return (
    <div className="stl-explanation-page">
      <div className="page-header">
        <h1>Voxel Space Components</h1>
        <p className="page-subtitle">
          Our Voxel Space satellite hub system consists of {componentsData.length} advanced modular components, each designed for maximum efficiency, reliability, and interoperability. These components work seamlessly together while maintaining individual functionality - click on any component to explore its detailed specifications and capabilities.
        </p>
      </div>

      <div className="page-controls">
        {selectedIds.size > 0 && (
          <button className="compare-selected-btn" onClick={scrollToComparison}>
            <span className="icon">📊</span>
            Compare Selected ({selectedIds.size})
          </button>
        )}
      </div>

      <div className="components-gallery">
        {filteredComponents.length > 0 ? (
          <div className="components-grid">
            {filteredComponents.map(renderComponentCard)}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No components found</h3>
            <p>Try selecting a different category or check back later for more components.</p>
          </div>
        )}
      </div>

      <div className="technical-specs">
        <h2>Technical Specifications Overview</h2>
        <p>
          The satellite hub system is designed for maximum efficiency and reliability. 
          Each component meets stringent space-grade requirements and undergoes extensive testing.
        </p>
        
        <div className="specs-comparison-table">
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Mass</th>
                <th>Power Consumption</th>
                <th>Dimensions</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {componentsData.filter(c => selectedIds.size ? selectedIds.has(c.id) : true).map(component => (
                <tr key={component.id}>
                  <td>{component.name}</td>
                  <td>{component.technicalSpecs.mass}</td>
                  <td>{component.technicalSpecs.powerConsumption}</td>
                  <td>{component.technicalSpecs.dimensions}</td>
                  <td>{component.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <button className="download-specs-btn">
          <span className="icon">📄</span>
          Download Complete Specifications
        </button>
      </div>
    </div>
  );
};

export default STLExplanation;