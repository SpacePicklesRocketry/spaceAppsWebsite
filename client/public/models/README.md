# 3D Models Directory

This directory contains STL files for 3D models used in the STL viewer component.

## Current Models

### Satellite Hub Components
- `hub-main.stl` - Main hub module (central structural component)
- `thermal-shield.stl` - Thermal protection system
- `debris-shield.stl` - Debris shield module
- `docking-mechanism.stl` - Docking mechanism for module attachment
- `communication-array.stl` - Communication array module
- `power-distribution.stl` - Power distribution unit
- `sensor-module.stl` - Sensor module
- `test.stl` - Test model (already exists)

## Placeholder Instructions

Until actual STL files are available, the `test.stl` file can be used as a fallback in the component data structure in `STLExplanation.jsx`. Simply update the `modelPath` property in each component object to point to `/models/test.stl` for testing purposes.

## Model Preparation Guidelines

When preparing STL files for the satellite hub components, follow these best practices:

### Positioning and Scale
- Center the model at origin (0,0,0)
- Use consistent scale across all models (recommend 1 unit = 1 meter)
- Ensure models are oriented consistently (e.g., Z-axis up)

### Performance Optimization
- Optimize polygon count for web performance (target < 100k triangles)
- Remove internal geometry that won't be visible
- Use mesh decimation tools to reduce complexity while maintaining detail

### File Format
- Export in binary STL format for smaller file sizes
- Ensure proper mesh topology (no holes, manifold geometry)
- Test with the STLViewer component before deployment

## Naming Convention

Use lowercase filenames with hyphens for consistency:
- `hub-main.stl` ✓
- `thermal-shield.stl` ✓
- `communication-array.stl` ✓

This naming pattern is:
- URL-safe
- Consistent across the application
- Human-readable
- Compatible with web servers

## File Size Optimization

To reduce STL file sizes without losing detail:

### Mesh Decimation
- Use tools like MeshLab or Blender to reduce polygon count
- Target 50k-100k triangles for complex components
- Maintain visual quality while reducing file size

### Geometry Cleanup
- Remove duplicate vertices and faces
- Eliminate internal structures not visible from outside
- Simplify non-critical details

### Compression
- Binary STL format is more compact than ASCII
- Consider using compressed formats if supported by the viewer
- Test loading performance with actual file sizes

## Usage

Models in this directory are served statically and can be referenced in the STL viewer component using their relative paths from the public directory.

## Adding New Models

To add new models:

1. Place the STL file in this directory following the naming convention
2. Update the component data structure in `STLExplanation.jsx` to include the new model
3. Test the model loads correctly in the application
4. Verify the model displays properly in the STLViewer component
5. Check performance on different devices and network conditions