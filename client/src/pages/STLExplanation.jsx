import React, { useState } from 'react';
import STLViewer from '../components/STLViewer';
import './STLExplanation.css';

const STLExplanation = () => {
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const componentsData = [
    {
      id: 'connector',
      name: 'Modular Connector',
      modelPath: '/models/Connector.stl',
      shortDescription: 'High-precision modular connector system enabling seamless integration between satellite components.',
      detailedDescription: 'The Modular Connector is a precision-engineered interface system that enables rapid assembly and disassembly of satellite modules. It features self-aligning mechanisms, redundant electrical connections, and data transfer capabilities, ensuring reliable operation in the harsh space environment.',
      technicalSpecs: {
        dimensions: '0.8m × 0.8m × 0.4m',
        mass: '45 kg',
        materials: 'Titanium alloy, Gold-plated contacts, Composite housing',
        operationalTemp: '-50°C to +85°C',
        powerConsumption: '0.1 kW',
        connectionPoints: '24 electrical + 8 data channels'
      },
      features: [
        'Self-aligning mechanism',
        'Redundant electrical paths',
        'High-speed data transfer',
        'Quick-release capability',
        'Space-grade materials'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Alignment Pins' },
        { position: { x: 70, y: 40 }, label: 'Power Contacts' },
        { position: { x: 50, y: 60 }, label: 'Data Interface' }
      ],
      category: 'Systems'
    },
    {
      id: 'gimbal',
      name: 'Precision Gimbal',
      modelPath: '/models/Gimball.stl',
      shortDescription: 'Advanced gimbal system providing precise orientation control for antennas and instruments.',
      detailedDescription: 'The Precision Gimbal System offers multi-axis orientation control with sub-degree accuracy. It enables precise pointing of antennas, cameras, and scientific instruments, ensuring optimal performance for communication and data collection missions.',
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
      id: 'port',
      name: 'Docking Port',
      modelPath: '/models/Port.stl',
      shortDescription: 'Automated docking port system for spacecraft rendezvous and module attachment.',
      detailedDescription: 'The Docking Port System enables automated spacecraft rendezvous and docking operations. It features precision guidance systems, secure capture mechanisms, and integrated power/data transfer capabilities for visiting spacecraft and additional modules.',
      technicalSpecs: {
        dimensions: '2.0m × 2.0m × 1.5m',
        mass: '180 kg',
        materials: 'Stainless steel, Composite panels, Precision actuators',
        operationalTemp: '-30°C to +80°C',
        powerConsumption: '2.2 kW',
        dockingAccuracy: '±5mm capture range'
      },
      features: [
        'Automated guidance system',
        'Secure capture mechanism',
        'Power transfer capability',
        'Data interface',
        'Emergency release system'
      ],
      annotations: [
        { position: { x: 40, y: 30 }, label: 'Guidance Sensors' },
        { position: { x: 60, y: 60 }, label: 'Capture Mechanism' },
        { position: { x: 30, y: 70 }, label: 'Power Interface' }
      ],
      category: 'Systems'
    },
    {
      id: 'hub-core',
      name: 'Hub Core Module',
      modelPath: '/models/test.stl',
      shortDescription: 'Central processing and control unit managing all satellite hub operations.',
      detailedDescription: 'The Hub Core Module serves as the central nervous system of the satellite hub. It houses the main computer systems, power distribution units, and communication interfaces, coordinating all operations and ensuring system reliability through redundant systems.',
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
    }
  ];

  const categories = ['all', 'Structure', 'Systems'];
  
  const filteredComponents = selectedCategory === 'all' 
    ? componentsData 
    : componentsData.filter(component => component.category === selectedCategory);

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
        case 'connector':
          return { 
            scale: 0.1, 
            cameraPosition: [0, 0, 50], 
            color: "#ff6b6b",
            metalness: 0.6,
            roughness: 0.3
          };
        case 'gimbal':
          return { 
            scale: 1.0, 
            cameraPosition: [60, 60, 60], 
            color: "#4ecdc4",
            metalness: 0.4,
            roughness: 0.4
          };
        case 'port':
          return { 
            scale: 0.6, 
            cameraPosition: [70, 70, 70], 
            color: "#45b7d1",
            metalness: 0.5,
            roughness: 0.3
          };
        case 'hub-core':
          return { 
            scale: 0.4, 
            cameraPosition: [80, 80, 80], 
            color: "#9b59b6",
            metalness: 0.7,
            roughness: 0.2
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
        {showAnnotations && (
          <div className="annotations-container">
            {component.annotations.map((annotation, index) => renderAnnotation(annotation, index))}
          </div>
        )}
      </div>
      
      <div className="component-header">
        <h3 className="component-name">{component.name}</h3>
        <div className="component-header-right">
          <span className="component-category">{component.category}</span>
          <label className="selection-checkbox">
            <input
              type="checkbox"
              checked={selectedIds.has(component.id)}
              onChange={() => toggleSelection(component.id)}
            />
            <span className="checkmark">✓</span>
          </label>
        </div>
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
          Explore the advanced modular components that make up our Voxel Space satellite hub system. 
          Each component is designed for maximum efficiency, reliability, and interoperability.
        </p>
      </div>

      <div className="page-controls">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Components' : category}
            </button>
          ))}
        </div>

        <div className="annotation-toggle">
          <label>
            <input
              type="checkbox"
              checked={showAnnotations}
              onChange={(e) => setShowAnnotations(e.target.checked)}
            />
            <span className="toggle-label">Show Annotations</span>
          </label>
        </div>

        {selectedIds.size > 0 && (
          <button className="compare-selected-btn" onClick={scrollToComparison}>
            <span className="icon">📊</span>
            Compare Selected ({selectedIds.size})
          </button>
        )}
      </div>

      <div className="components-overview">
        <p>
          Our satellite hub system consists of {componentsData.length} core components, 
          each designed to work seamlessly together while maintaining individual functionality. 
          Click on any component to explore its detailed specifications and capabilities.
        </p>
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