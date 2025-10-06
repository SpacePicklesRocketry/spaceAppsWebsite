import React, { useState } from 'react';
import './STLExplanation.css';

const STLExplanation = () => {
  const [expandedComponent, setExpandedComponent] = useState(null);

  const componentsData = [
    {
      id: 'main-hub',
      name: 'Main Hub',
      modelPath: '/models/test.stl',
      shortDescription: 'Central processing and control unit managing all satellite hub operations and power distribution.',
      detailedDescription: 'The Main Hub serves as the core of the satellite system, housing main computer systems, power distribution, and communication interfaces. It coordinates all operations and ensures system reliability through redundant systems and fail-safe mechanisms.',
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
      category: 'Infrastructure',
      usage: 'Central control and power management for the entire satellite hub system.',
      execution: 'Houses avionics, attitude determination and control system, communications, thermal management, compute & storage systems. Features 1kW solar panel with ECGSolax 20 kWh High-Voltage LiFePO₄ battery pack to sustain minimal life functions (100W) for up to 1 week.'
    },
    {
      id: 'hub-power-system',
      name: 'Hub Power System',
      modelPath: '/models/test.stl',
      shortDescription: 'Centralized power generation and distribution system for the main hub.',
      detailedDescription: 'Comprehensive power system featuring 1kW solar panel array and ECGSolax 20 kWh High-Voltage LiFePO₄ battery storage. Dedicated to powering hub systems and maintaining minimal life functions for up to one week.',
      technicalSpecs: {
        dimensions: '2.0m × 1.5m × 0.8m',
        mass: '150 kg',
        materials: 'Solar cells, LiFePO₄ batteries, Power electronics',
        operationalTemp: '-40°C to +85°C',
        powerGeneration: '1kW solar',
        powerStorage: '20 kWh battery'
      },
      features: [
        '1kW solar panel array',
        'ECGSolax 20 kWh battery',
        'Power distribution system',
        'Minimal life function support',
        'One week autonomy'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Solar Array' },
        { position: { x: 70, y: 40 }, label: 'Battery Pack' },
        { position: { x: 50, y: 60 }, label: 'Distribution Unit' }
      ],
      category: 'Power System',
      usage: 'Collect and distribute power for hub operations.',
      execution: 'Sources: 1kW solar panel. Storage: Battery pack to sustain minimal life functions(100W) for up to 1 week - ECGSolax 20 kWh High-Voltage LiFePO₄. Power distribution: 100% of the hub\'s solar panels will be dedicated to powering the hub\'s systems and recharging its batteries. Hub power usage: Avionics & Attitude Determination and Control System, Comms, Thermal (heaters/fans), Compute & Storage.'
    },
    {
      id: 'space-debris-shield',
      name: 'Space Debris Mitigation Shield',
      modelPath: '/models/test.stl',
      shortDescription: 'Multilayered absorption apparatus for collecting and disposing of small space debris.',
      detailedDescription: 'Advanced shield system designed to safely collect and dispose of small chunks of space debris (>10cm) that are too small to be detected via ground stations. Features onboard radar detection and multilayered absorption technology.',
      technicalSpecs: {
        dimensions: '3.0m × 2.0m × 0.3m',
        mass: '180 kg',
        materials: 'Titanium deadstops, Dual cell foam energy absorber, Radar systems',
        operationalTemp: '-50°C to +85°C',
        powerConsumption: '0.3 kW',
        detectionTimeframe: '10-20 seconds'
      },
      features: [
        'Onboard radar detection',
        'Multilayered absorption (6x energy absorption)',
        'Titanium deadstops (2x)',
        'Automated positioning',
        'Debris storage system'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Radar System' },
        { position: { x: 70, y: 40 }, label: 'Absorption Layers' },
        { position: { x: 50, y: 60 }, label: 'Storage Compartment' }
      ],
      category: 'Infrastructure',
      usage: 'Safely collect and dispose of small chunks of space debris (>10cm) that are too small to be detected via ground stations.',
      execution: 'Using onboard radar, detect incoming small space debris within a 10-20 second time frame. Move a large rectangular multilayered (6x energy absorption (dual cell foam energy absorber), 2x deadstops (titanium)) absorption apparatus (shield) to collision point. Absorb impact and store space debris. During periodic hub decommission, remove space debris. After collection, debris will be deposited into an empty fuel module and sent down for recovery.'
    },
    {
      id: 'modular-connection-system',
      name: 'Modular Connection System',
      modelPath: '/models/test.stl',
      shortDescription: 'Advanced male/female port system ensuring stackability and interconnectedness of modules.',
      detailedDescription: 'Sophisticated connection system featuring motorized male ports with alignment rods and pins, and female ports with corresponding holes and pinions. Enables secure module stacking and reduces fuel consumption through automated orientation.',
      technicalSpecs: {
        dimensions: '0.8m × 0.8m × 0.4m',
        mass: '95 kg',
        materials: 'Titanium alloy, Precision motors, Gas shock systems',
        operationalTemp: '-40°C to +70°C',
        powerConsumption: '0.4 kW',
        connectionAccuracy: '±1mm precision'
      },
      features: [
        'Motorized male port orientation',
        '14-pin connection system',
        '3-alignment rod system',
        'Ratcheting mechanism',
        'Gas shock ejection system'
      ],
      annotations: [
        { position: { x: 25, y: 30 }, label: 'Male Port' },
        { position: { x: 75, y: 50 }, label: 'Female Port' },
        { position: { x: 50, y: 70 }, label: 'Alignment System' }
      ],
      category: 'Individual Modules',
      usage: 'To ensure stackability/interconnectedness of each module to its neighbors and the main hub to increase the maximum number of customers per hub satellite.',
      execution: 'Male port: Has three alignment rods and 14 pins. Each of the 14 pins has a rack. The male port is motorized so that it can spin to orient itself better with the female port. This saves fuel because it means we have one less axis of maneuverability to worry about. Female port: Has 3 holes for the alignment rods and 14 pinholes. Each pinhole has a pinion that is connected to a ratcheting mechanism. Each alignment rod hole also has a gas shock. The racks of the male port spin the pinions on the female port which locks the two together via the ratcheting mechanism. The gas shocks from the female port are used for ejection.'
    },
    {
      id: 'recovery-system',
      name: 'Recovery System',
      modelPath: '/models/test.stl',
      shortDescription: 'Automated recovery system for modules requiring physical analysis and expensive research apparatuses.',
      detailedDescription: 'Comprehensive recovery system that analyzes orbital routes and executes controlled deorbit maneuvers. Features gimballed thrusters, parachute deployment, and shock absorption for safe module recovery.',
      technicalSpecs: {
        dimensions: '2.5m × 2.5m × 1.2m',
        mass: '200 kg',
        materials: 'Stainless steel, Composite panels, Precision actuators',
        operationalTemp: '-30°C to +80°C',
        powerConsumption: '1.8 kW',
        recoveryAccuracy: '±5km landing zone'
      },
      features: [
        'NASA SWCWeb orbital analysis',
        'Gimballed thruster control',
        'Parachute deployment system',
        'Spring shock absorption',
        'Floatation devices',
        'Beacon tracking system'
      ],
      annotations: [
        { position: { x: 40, y: 30 }, label: 'Thruster System' },
        { position: { x: 60, y: 60 }, label: 'Parachute Bay' },
        { position: { x: 30, y: 70 }, label: 'Shock Absorber' }
      ],
      category: 'Individual Modules',
      usage: 'To ensure recovery of samples requiring physical analysis and/or modules containing expensive research apparatuses.',
      execution: 'Days leading to deorbit, algorithms analyze predicted orbital routes of other LEO satellites using NASA SWCWeb. After determining optimal timing (based on estimated module landing position and other LEO objects positions), eject the to-be-deorbited module from the stack. Upon ejection, use gimballed thrusters to orient towards earth / induce downwards Δv. As atmosphere/weight increase, weighted nosecone properly orients the descending module. Upon sufficient altitude, use remaining fuel for deceleration whilst deploying parachutes located at top of the module. Float downwards and absorb shock using a dedicated spring system. Deploy floatation devices (located above the spring system). Track and recover using beacon.'
    },
    {
      id: 'gimballed-thruster-system',
      name: 'Gimballed Thruster System',
      modelPath: '/models/test.stl',
      shortDescription: 'Precision thruster system for module orientation, acceleration, and orbital maneuvers.',
      detailedDescription: 'Advanced thruster system featuring two gimballed liquid fuel thrusters with dedicated control algorithms. Enables precise orientation and acceleration for connections, disconnections, and orbital maneuvers with collision prevention.',
      technicalSpecs: {
        dimensions: '1.2m × 1.2m × 0.6m',
        mass: '85 kg',
        materials: 'Aluminum alloy, Precision bearings, Stepper motors',
        operationalTemp: '-40°C to +70°C',
        powerConsumption: '0.8 kW',
        pointingAccuracy: '±0.1° in all axes'
      },
      features: [
        'Dual gimballed thrusters',
        'Liquid fuel propulsion',
        'Collision prevention sensors',
        'Dedicated control algorithms',
        'Periodic refueling capability'
      ],
      annotations: [
        { position: { x: 25, y: 30 }, label: 'Thruster 1' },
        { position: { x: 75, y: 50 }, label: 'Thruster 2' },
        { position: { x: 50, y: 70 }, label: 'Control System' }
      ],
      category: 'Individual Modules',
      usage: 'Orient and accelerate the module for connections, disconnections, and orbits.',
      execution: 'Via two gimballed liquid fuel thrusters + dedicated control algorithms, orient/accelerate the module. Use sensors to prevent collisions during docking. Periodic refueling modules will be sent up (standard module filled with nothing but fuel), then emptied into the satellite.'
    },
    {
      id: 'space-debris-avoidance',
      name: 'Space Debris Avoidance',
      modelPath: '/models/test.stl',
      shortDescription: 'Automated collision avoidance system for large space debris detection and maneuvering.',
      detailedDescription: 'Advanced collision avoidance system that analyzes NASA SWCWeb data to detect and avoid large chunks of space debris (10cm+). Uses drag orientation and/or thruster orientation depending on collision timeframe to execute avoidance maneuvers.',
      technicalSpecs: {
        dimensions: '1.0m × 1.0m × 0.5m',
        mass: '120 kg',
        materials: 'Aluminum alloy, Radar systems, Control electronics',
        operationalTemp: '-50°C to +85°C',
        powerConsumption: '0.5 kW',
        detectionRange: '10km radius'
      },
      features: [
        'NASA SWCWeb data integration',
        'Automated collision detection',
        'Drag orientation control',
        'Thruster-based maneuvering',
        'Real-time decision making'
      ],
      annotations: [
        { position: { x: 40, y: 30 }, label: 'Radar Array' },
        { position: { x: 60, y: 60 }, label: 'Control System' },
        { position: { x: 30, y: 70 }, label: 'Data Interface' }
      ],
      category: 'Infrastructure',
      usage: 'Avoid large chunks of space debris (10cm+).',
      execution: 'Analyzing NASA SWCWeb data, use drag orientation and/or thruster orientation (depending on collision timeframe) to execute the collision avoidance maneuver.'
    },
    {
      id: 'temperature-radiation-mitigation',
      name: 'Temperature/Radiation Mitigation System',
      modelPath: '/models/test.stl',
      shortDescription: 'Advanced thermal and radiation protection system for spacecraft components.',
      detailedDescription: 'Comprehensive protection system featuring AO-resistant film, MLI insulation, and forced-air recirculation. Provides 98% thermal radiation reflection and maintains constant internal temperature.',
      technicalSpecs: {
        dimensions: '2.0m × 2.0m × 0.2m',
        mass: '80 kg',
        materials: 'SiO2-coated Kapton, MLI insulation, Thermal control systems',
        operationalTemp: '-50°C to +85°C',
        powerConsumption: '0.2 kW',
        thermalReflection: '98%'
      },
      features: [
        'SiO2-coated Kapton film',
        '15-layer MLI insulation',
        'Forced-air recirculation',
        'Atomic oxygen resistance',
        'Thermal radiation barrier'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'AO Film' },
        { position: { x: 70, y: 40 }, label: 'MLI Layers' },
        { position: { x: 50, y: 60 }, label: 'Air Circulation' }
      ],
      category: 'Infrastructure',
      usage: 'Protect spacecraft components from temperature extremes and radiation damage.',
      execution: 'Initial layer of AO-resistant film, such as SiO2-coated Kapton, with 15 layers of MLI insulation over it. SiO2-coated Kapton - protects against atomic oxygen degradation while also acting as a barrier to prevent heat absorption. MLI insulation - The MLI(Multi-Layer Insulation) is meant to minimize radiative and conductive heat transfer, by using multiple reflective layers to reflect 98% of thermal radiation. Within the spacecraft, temperature will be regulated with a forced-air recirculation cycle that maintains a constant internal temperature by continuously moving in a closed loop and having multiple heat sources/sinks(depending on the temperature).'
    },
    {
      id: 'mission-dashboard-system',
      name: 'Mission Dashboard System',
      modelPath: '/models/test.stl',
      shortDescription: 'Real-time monitoring and control interface for satellite hub operations and mission management.',
      detailedDescription: 'Advanced dashboard system providing comprehensive real-time monitoring of all satellite hub operations, sensor data, communication status, and mission parameters. Features interactive 3D visualization, automated alerts, and remote control capabilities.',
      technicalSpecs: {
        dimensions: '1.5m × 1.0m × 0.3m',
        mass: '45 kg',
        materials: 'High-resolution displays, Touch interfaces, Computing systems',
        operationalTemp: '-20°C to +60°C',
        powerConsumption: '0.8 kW',
        displayResolution: '4K Ultra HD'
      },
      features: [
        'Real-time data visualization',
        '3D satellite tracking',
        'Mission timeline management',
        'Automated alert system',
        'Remote control interface',
        'Data logging and analytics'
      ],
      annotations: [
        { position: { x: 30, y: 25 }, label: 'Main Display' },
        { position: { x: 70, y: 40 }, label: 'Control Panel' },
        { position: { x: 50, y: 60 }, label: 'Data Interface' }
      ],
      category: 'Control Systems',
      usage: 'Monitor and control satellite hub operations, track mission progress, and manage system health.',
      execution: 'Provides comprehensive real-time monitoring through high-resolution displays showing satellite position, sensor readings, communication status, and mission parameters. Features interactive 3D visualization of the satellite hub and surrounding space environment. Automated alert system notifies operators of any anomalies or critical events. Remote control capabilities allow for mission adjustments and emergency interventions.'
    }
  ];

  const toggleComponentExpansion = (componentId) => {
    setExpandedComponent(expandedComponent === componentId ? null : componentId);
  };

  const getImageName = (componentId) => {
    const imageMap = {
      'main-hub': 'hub',
      'space-debris-avoidance': 'collisionAvoidance',
      'space-debris-shield': 'shield',
      'gimballed-thruster-system': 'gimbal',
      'recovery-system': 'spring',
      'hub-power-system': 'solar',
      'modular-connection-system': 'module',
      'temperature-radiation-mitigation': 'temperature',
      'mission-dashboard-system': 'dashboard'
    };
    return imageMap[componentId] || componentId.replace(/-/g, '');
  };

  const renderAnnotation = (annotation, index) => {
    return (
      <div
        key={index}
        className="annotation"
        style={{
          position: 'absolute',
          left: `${annotation.position.x}%`,
          top: `${annotation.position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="annotation-marker"></div>
        <div className="annotation-label">{annotation.label}</div>
      </div>
    );
  };

  const renderComponentCard = (component) => {
    const getComponentSettings = (componentId) => {
      const settings = {
        'main-hub': { scale: 0.015, cameraPosition: [0, -8, 6], color: '#06b6d4', metalness: 0.6, roughness: 0.3 },
        'space-debris-avoidance': { scale: 0.02, cameraPosition: [0, -6, 5], color: '#ef4444', metalness: 0.4, roughness: 0.5 },
        'space-debris-shield': { scale: 0.018, cameraPosition: [0, -7, 5], color: '#f59e0b', metalness: 0.5, roughness: 0.4 },
        'modular-connection-system': { scale: 0.025, cameraPosition: [0, -5, 4], color: '#10b981', metalness: 0.7, roughness: 0.2 },
        'recovery-system': { scale: 0.015, cameraPosition: [0, -8, 6], color: '#8b5cf6', metalness: 0.6, roughness: 0.3 },
        'gimballed-thruster-system': { scale: 0.02, cameraPosition: [0, -6, 5], color: '#ec4899', metalness: 0.5, roughness: 0.4 },
        'hub-power-system': { scale: 0.018, cameraPosition: [0, -7, 5], color: '#f97316', metalness: 0.6, roughness: 0.3 },
        'module-power-system': { scale: 0.02, cameraPosition: [0, -6, 5], color: '#84cc16', metalness: 0.5, roughness: 0.4 },
        'temperature-radiation-mitigation': { scale: 0.015, cameraPosition: [0, -8, 6], color: '#06b6d4', metalness: 0.4, roughness: 0.6 },
        'mission-dashboard-system': { scale: 0.02, cameraPosition: [0, -6, 5], color: '#3b82f6', metalness: 0.3, roughness: 0.7 }
      };
      return settings[componentId] || { scale: 0.02, cameraPosition: [0, -6, 5], color: '#06b6d4', metalness: 0.5, roughness: 0.4 };
    };
    
    const settings = getComponentSettings(component.id);
    
    return (
      <div
        key={component.id}
        className={`component-card ${expandedComponent === component.id ? 'expanded' : ''}`}
      >
        <div className="component-viewer">
          <img 
            src={`/images/${getImageName(component.id)}.png`} 
            alt={component.name}
            className="component-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="static-image-placeholder" style={{display: 'none'}}>
            <div className="placeholder-content">
              <div className="placeholder-icon">📷</div>
              <p className="placeholder-text">Image Not Found</p>
              <p className="placeholder-subtitle">{component.name}</p>
            </div>
          </div>
        <div className="annotations-container">
          {component.annotations.map((annotation, index) => renderAnnotation(annotation, index))}
        </div>
      </div>
      
      <div className="component-header">
        <h3 className="component-name">{component.name}</h3>
        <div className="component-actions">
          <button
            className="expand-btn"
            onClick={() => toggleComponentExpansion(component.id)}
          >
            {expandedComponent === component.id ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      
      <div className="component-content">
        <p className="component-description">{component.shortDescription}</p>
        
        {expandedComponent === component.id && (
          <div className="expanded-content">
            <div className="detailed-description">
              <h4>Detailed Description</h4>
              <p>{component.detailedDescription}</p>
            </div>
            
            <div className="usage-execution">
              <div className="usage-section">
                <h4>Usage</h4>
                <p>{component.usage}</p>
              </div>
              <div className="execution-section">
                <h4>Execution</h4>
                <p>{component.execution}</p>
              </div>
            </div>
          </div>
        )}
      </div>
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

      <div className="components-list">
        {componentsData.map(renderComponentCard)}
      </div>
    </div>
  );
};

export default STLExplanation;