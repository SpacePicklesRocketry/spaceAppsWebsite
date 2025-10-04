# LEO Satellite Hub Website

A React + Vite frontend application for the LEO Satellite Hub platform - an affordable space research platform for educational institutions.

## Prerequisites

- Node.js 18.0.0 or higher (LTS recommended)
- npm or yarn package manager

## Installation

1. Clone the repository and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Developers can override `VITE_API_BASE_URL` as needed in `.env.local`.

## Development

### Available Scripts

- `npm run dev` - Start the development server (runs on http://localhost:3000)
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

### Development Server

```bash
npm run dev
```

The application will start on http://localhost:3000 with hot module replacement enabled.

## Project Structure

```
client/
├── public/                 # Static assets served directly
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Layout.jsx     # Main layout wrapper with navbar/footer
│   │   ├── Navbar.jsx     # Navigation component
│   │   └── Footer.jsx     # Footer component
│   ├── pages/             # Page-level components
│   │   ├── Landing.jsx    # Home page with 3D STL viewer
│   │   ├── BusinessModel.jsx # Business model page
│   │   ├── STLExplanation.jsx # Technology/components page
│   │   ├── Dashboard.jsx  # Dashboard page (NPM integration)
│   │   ├── Contact.jsx    # Contact form page
│   │   └── FAQ.jsx        # FAQ page
│   ├── assets/            # Static assets
│   │   ├── stl/           # STL 3D model files
│   │   └── images/        # Images, logos, icons
│   ├── utils/             # Utility functions
│   │   └── api.js         # API client and helper functions
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles and CSS variables
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── index.html             # HTML entry point
```

## Features

### Current Implementation
- ✅ React + Vite project setup
- ✅ React Router for client-side routing
- ✅ Component structure with Layout, Navbar, Footer
- ✅ Page skeletons for all routes
- ✅ API utility setup with axios
- ✅ Environment configuration
- ✅ CSS variables and base styles

### Upcoming Features (Implementation Phases)
- 🔄 Landing page with 3D STL viewer animation
- 🔄 Business model pages with detailed content
- 🔄 STL files explanation page with 3D viewers
- 🔄 NPM dashboard integration
- 🔄 Contact/FAQ pages with backend integration
- 🔄 Advanced styling and responsive design

## Working with 3D Models

### Adding STL Files

STL files should be placed in the `public/models/` directory. Files in `public/` are served as static assets and can be referenced with absolute paths (e.g., `/models/satellite-hub.stl`).

**Requirements:**
- Use binary STL format for better performance
- Keep file sizes reasonable (under 10MB) for faster loading
- Ensure models are properly centered and scaled for web display
- Test models in the STLViewer component before committing

### Using the STLViewer Component

The STLViewer component provides an interactive 3D viewer for STL files. Import and use it in your components:

```jsx
import STLViewer from '../components/STLViewer'

// Basic usage
<STLViewer modelPath="/models/satellite-hub.stl" />

// With custom options
<STLViewer 
  modelPath="/models/your-model.stl" 
  autoRotate={true} 
  scale={0.02}
  cameraPosition={[0, 0, 5]}
/>
```

**Available Props:**
- `modelPath` (required) - Path to the STL file (e.g., "/models/satellite-hub.stl")
- `autoRotate` (boolean) - Enable automatic rotation (default: true)
- `scale` (number) - Scale factor for the model (default: 0.02)
- `cameraPosition` (array) - Initial camera position [x, y, z] (default: [0, 0, 5])

### 3D Viewer Controls

The STLViewer provides interactive controls:
- **Left-click drag** - Rotate the model
- **Scroll wheel** - Zoom in/out
- **Right-click drag** - Pan the view
- **Auto-rotation** - Can be toggled via the `autoRotate` prop

### Troubleshooting

**Model doesn't appear:**
- Check the browser console for loading errors
- Verify the file path is correct (should start with `/models/`)
- Ensure the STL file is valid and not corrupted
- Try adjusting the `scale` prop if the model appears too large or too small

**Performance Tips:**
- For large models, consider using binary STL format
- The Vite build config already chunks Three.js libraries separately for optimal loading
- Models are loaded asynchronously with a loading indicator
- Use appropriate scale values to optimize rendering performance

## API Integration

The application is configured to communicate with a backend API. Configure the API base URL in your `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

The development server includes proxy configuration to forward `/api` requests to the backend server. Without `.env.local`, dev requests go through the Vite proxy.

## Dependencies

### Core Dependencies
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Three.js** - 3D graphics library
- **Axios** - HTTP client for API requests

### Development Dependencies
- **Vite** - Build tool and dev server
- **@vitejs/plugin-react** - React support for Vite
- **ESLint** - Code linting

## Contributing

1. Follow the existing code structure and naming conventions
2. Use the established CSS variables for consistent styling
3. Ensure all components are properly documented
4. Test your changes with `npm run lint` before committing

## License

This project is part of the LEO Satellite Hub platform. See the main project repository for license information.
