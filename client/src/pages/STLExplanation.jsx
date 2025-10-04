import React, { useState } from 'react';
import STLViewer from '../components/STLViewer';
import './STLExplanation.css';

const STLExplanation = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const componentsData = [
    {
      id: 'hub-main',
      name: 'Main Hub Module',
      modelPath: '/models/test.stl',
      shortDescription: 'Central structural component that serves as the primary connection point for all satellite modules.',
      detailedDescription: 'The Main Hub Module is the core structural element of the satellite hub system. It provides the primary mounting interface for all other components and houses critical systems including the central processing unit, power distribution nodes, and primary data bus connections. The module is designed with redundant connection points to ensure system reliability and modularity.',
      technicalSpecs: {
        dimensions: '2.5m × 2.5m × 1.8m',
        mass: '450 kg',
        materials: 'Titanium alloy, Carbon fiber composite',
        operationalTemp: '-40°C to +85°C',
        powerConsumption: '2.5 kW',
        connectionPoints: '12 modular interfaces'
      },
      features: [
        'Modular interface system',
        'Redundant power distribution',
        'Central data processing',
        'Thermal management system',
        'Radiation shielding'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Power Distribution' },
        { position: { x: 70, y: 40 }, label: 'Data Bus Interface' },
        { position: { x: 50, y: 60 }, label: 'Modular Mounting' }
      ],
      category: 'Structure'
    },
    {
      id: 'thermal-shield',
      name: 'test',
      modelPath: '/models/test.stl',
      shortDescription: 'Advanced thermal management system providing temperature regulation and heat dissipation.',
      detailedDescription: 'The Thermal Protection System employs multi-layer insulation, heat pipes, and active cooling mechanisms to maintain optimal operating temperatures for all satellite components. It features adaptive thermal control that responds to varying solar exposure and internal heat generation.',
      technicalSpecs: {
        dimensions: '3.0m × 3.0m × 0.3m',
        mass: '180 kg',
        materials: 'Multi-layer insulation, Heat pipes, Radiator panels',
        operationalTemp: '-60°C to +120°C',
        powerConsumption: '0.8 kW',
        heatDissipation: '5.2 kW'
      },
      features: [
        'Multi-layer insulation',
        'Active cooling system',
        'Heat pipe technology',
        'Adaptive thermal control',
        'Solar radiation protection'
      ],
      annotations: [
        { position: { x: 20, y: 30 }, label: 'Insulation Layers' },
        { position: { x: 80, y: 50 }, label: 'Heat Pipes' },
        { position: { x: 50, y: 20 }, label: 'Radiator Panels' }
      ],
      category: 'Protection'
    },
    {
      id: 'debris-shield',
      name: 'test',
      modelPath: '/models/test.stl',
      shortDescription: 'Protective barrier system designed to shield critical components from space debris and micrometeorites.',
      detailedDescription: 'The Debris Shield Module provides comprehensive protection against space debris, micrometeorites, and other orbital hazards. It uses advanced composite materials and multi-layer shielding technology to absorb and deflect impacts while maintaining structural integrity.',
      technicalSpecs: {
        dimensions: '4.0m × 4.0m × 0.5m',
        mass: '320 kg',
        materials: 'Kevlar composite, Aluminum honeycomb, Ceramic tiles',
        operationalTemp: '-50°C to +100°C',
        powerConsumption: '0.2 kW',
        impactResistance: 'Up to 1cm debris at 10km/s'
      },
      features: [
        'Multi-layer impact protection',
        'Self-healing composite materials',
        'Modular panel system',
        'Impact detection sensors',
        'Automatic damage assessment'
      ],
      annotations: [
        { position: { x: 25, y: 40 }, label: 'Impact Sensors' },
        { position: { x: 75, y: 30 }, label: 'Composite Layers' },
        { position: { x: 50, y: 70 }, label: 'Honeycomb Core' }
      ],
      category: 'Protection'
    },
    {
      id: 'docking-mechanism',
      name: 'test',
      modelPath: '/models/test.stl',
      shortDescription: 'Automated docking and attachment system for connecting additional modules and spacecraft.',
      detailedDescription: 'The Docking Mechanism enables automated connection and disconnection of modules and visiting spacecraft. It features precision alignment systems, secure locking mechanisms, and data/power transfer interfaces for seamless integration.',
      technicalSpecs: {
        dimensions: '1.8m × 1.8m × 1.2m',
        mass: '280 kg',
        materials: 'Stainless steel, Precision actuators, Composite housing',
        operationalTemp: '-30°C to +70°C',
        powerConsumption: '1.5 kW',
        dockingAccuracy: '±2mm alignment'
      },
      features: [
        'Precision alignment system',
        'Automated locking mechanism',
        'Data transfer interface',
        'Power connection system',
        'Emergency release capability'
      ],
      annotations: [
        { position: { x: 40, y: 30 }, label: 'Alignment Sensors' },
        { position: { x: 60, y: 60 }, label: 'Locking Mechanism' },
        { position: { x: 30, y: 70 }, label: 'Power Interface' }
      ],
      category: 'Systems'
    },
    {
      id: 'communication-array',
      name: 'test',
      modelPath: '/models/test.stl',
      shortDescription: 'High-gain antenna system providing Earth communication and inter-satellite networking capabilities.',
      detailedDescription: 'The Communication Array features multiple high-gain antennas operating across different frequency bands. It provides reliable Earth communication, inter-satellite networking, and data relay capabilities with adaptive beamforming technology.',
      technicalSpecs: {
        dimensions: '2.2m × 2.2m × 0.8m',
        mass: '195 kg',
        materials: 'Carbon fiber, Gold-plated antennas, RF electronics',
        operationalTemp: '-40°C to +80°C',
        powerConsumption: '3.2 kW',
        frequencyRange: 'S-band, X-band, Ka-band'
      },
      features: [
        'Multi-band operation',
        'Adaptive beamforming',
        'High data rate capability',
        'Inter-satellite networking',
        'Automatic tracking system'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'S-Band Antenna' },
        { position: { x: 70, y: 35 }, label: 'X-Band Array' },
        { position: { x: 50, y: 65 }, label: 'Ka-Band Dish' }
      ],
      category: 'Communication'
    },
    {
      id: 'power-distribution',
      name: 'test',
      modelPath: '/models/test.stl',
      shortDescription: 'Centralized power management system distributing electrical power to all satellite components.',
      detailedDescription: 'The Power Distribution Unit manages electrical power from solar arrays and batteries, providing regulated power distribution to all satellite systems. It includes fault protection, power monitoring, and load balancing capabilities.',
      technicalSpecs: {
        dimensions: '1.5m × 1.5m × 0.6m',
        mass: '120 kg',
        materials: 'Aluminum housing, Copper bus bars, Silicon electronics',
        operationalTemp: '-20°C to +60°C',
        powerConsumption: '0.5 kW',
        powerCapacity: '15 kW total distribution'
      },
      features: [
        'Intelligent load balancing',
        'Fault protection systems',
        'Power monitoring',
        'Battery management',
        'Solar array control'
      ],
      annotations: [
        { position: { x: 35, y: 40 }, label: 'Power Bus' },
        { position: { x: 65, y: 30 }, label: 'Fault Protection' },
        { position: { x: 50, y: 70 }, label: 'Battery Interface' }
      ],
      category: 'Systems'
    }
  ];

  const categories = ['all', 'Structure', 'Protection', 'Systems', 'Communication'];
  
  const filteredComponents = selectedCategory === 'all' 
    ? componentsData 
    : componentsData.filter(component => component.category === selectedCategory);

  const handleComponentExpand = (componentId) => {
    setExpandedComponent(expandedComponent === componentId ? null : componentId);
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

  const renderComponentCard = (component) => (
    <div
      key={component.id}
      className={`component-card ${expandedComponent === component.id ? 'expanded' : ''}`}
    >
      <div className="component-viewer">
        <STLViewer
          modelPath={component.modelPath}
          autoRotate={expandedComponent === component.id}
          scale={0.015}
          cameraPosition={[5, 10, 7]}
          fov={50}
          autoRotateSpeed={0.8}
          color="#06b6d4"
          metalness={0.4}
          roughness={0.3}
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

  return (
    <div className="stl-explanation-page">
      <div className="page-header">
        <h1>Satellite Hub Components</h1>
        <p className="page-subtitle">
          Explore the advanced modular components that make up our satellite hub system. 
          Each component is designed for maximum efficiency, reliability, and interoperability.
        </p>
      </div>

      <div className="page-controls">
        <div className="view-mode-toggle">
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            <span className="icon">⊞</span> Grid
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            <span className="icon">☰</span> List
          </button>
        </div>

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
          <div className={`components-grid ${viewMode === 'list' ? 'components-list' : ''}`}>
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