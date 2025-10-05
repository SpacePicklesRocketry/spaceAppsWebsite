# Python Satellite Tracking Scripts

This directory contains Python scripts for fetching and displaying satellite position data from NASA's Satellite Situation Center (SSC) Web Services.

## Overview

The satellite tracking functionality uses NASA's Satellite Situation Center (SSC) Web Services to fetch real-time satellite position data. This provides access to position information for satellites tracked by NASA's SSC, including the International Space Station (ISS) and other space physics missions.

**Official sscws documentation:** https://sscweb.gsfc.nasa.gov/WebServices/REST/py/sscws/

## Installation

### Prerequisites
- Python 3.7 or higher is required

### Dependencies
Install the required packages using pip:

```bash
pip install -r requirements.txt
```

**Note:** It's recommended to use a virtual environment for Python projects:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Cartopy Installation Notes
The visualization features require `cartopy`, which needs additional system dependencies:

- **macOS**: `brew install geos proj`
- **Ubuntu/Debian**: `sudo apt-get install libgeos-dev libproj-dev`
- **Windows**: Recommend using conda: `conda install -c conda-forge cartopy`

If cartopy installation fails, the script still works without visualization features.

## Usage

### Basic Usage (No Visualization)
```bash
python satellite_tracker.py
```

### List Available Satellites
```bash
python satellite_tracker.py --list-satellites
```

### Plot Satellite Positions (Static)
```bash
python satellite_tracker.py --plot
```

### Track Specific Satellites
```bash
python satellite_tracker.py -s iss ace wind --plot
```

### Real-Time Tracking with Updates
```bash
python satellite_tracker.py --plot --realtime --update-interval 30
```

### Adjust Time Window
```bash
python satellite_tracker.py -s iss -t 6 --plot
python satellite_tracker.py -s iss -t 0.5 --plot  # 30 minutes
```

### Command-Line Arguments
| Argument | Short | Description |
|----------|-------|-------------|
| `--satellites` | `-s` | Satellite IDs to track (space-separated) |
| `--time-window` | `-t` | Time window in hours (supports fractional hours) |
| `--plot` | `-p` | Enable visualization |
| `--realtime` | `-r` | Enable real-time updates |
| `--update-interval` | `-u` | Seconds between updates in realtime mode |
| `--list-satellites` | `-l` | List all available satellites |
| `--trajectory` | | Show trajectory path (default: enabled) |
| `--no-trajectory` | | Disable trajectory path |
| `--help` | `-h` | Show help message |

## Visualization

The script now includes powerful visualization capabilities using matplotlib and cartopy:

### 2D Earth Map
- **Projection**: Uses Cartopy's PlateCarree projection for realistic Earth view
- **Geographic Features**: Displays coastlines, borders, land, and ocean coloring
- **Grid Lines**: Shows latitude and longitude grid with degree markings

### Satellite Markers
- **Color-Coded Points**: Each satellite gets a distinct color from the tab10 colormap
- **Labels**: Satellite names displayed near current positions with colored backgrounds
- **Size**: Optimized marker size for clear visibility

### Trajectory Paths
- **Movement Visualization**: Lines showing satellite movement over the time window
- **Transparency**: Semi-transparent lines to avoid visual clutter
- **Multiple Satellites**: Each satellite's trajectory in its assigned color

### Real-Time Mode
- **Auto-Refresh**: Plot updates automatically at configurable intervals
- **Interactive**: Uses matplotlib's interactive mode for smooth updates
- **Graceful Exit**: Press Ctrl+C to stop real-time tracking
- **Console Feedback**: Timestamps printed for each update

### Static vs Real-Time
- **Static Mode**: Single plot showing current positions and trajectory
- **Real-Time Mode**: Continuously updating plot with fresh data
- **Performance**: Real-time mode optimized for smooth updates

## Understanding the Output

### Coordinate System
The script uses the **GEO (Geographic)** coordinate system, which provides:
- **Latitude**: Position north/south of the equator (-90° to +90°)
- **Longitude**: Position east/west (0° to 360°)
- **Altitude**: Height above Earth's surface in kilometers

### Time Format
All timestamps are provided in **UTC (Coordinated Universal Time)** format.

### Data Window
By default, the script fetches position data for the **last hour** to ensure data availability.

## Customization

### Modifying the Satellite List
To track different satellites, edit the `default_satellites` list in `satellite_tracker.py`:

```python
# Example: Track multiple satellites
default_satellites = ['iss', 'ace', 'wind']
```

**Note:** Available satellite IDs can be seen by running the script - it lists all available satellites first.

### Changing the Time Window
To modify the time window for data fetching, change the `time_window_hours` parameter:

```python
# Fetch data for the last 6 hours
satellite_data = fetch_satellite_positions(default_satellites, time_window_hours=6)
```

## What is sscws?

The `sscws` package provides access to NASA's Satellite Situation Center database, which tracks:

- **Space Physics Missions**: Satellites studying space weather and solar-terrestrial interactions
- **International Space Station (ISS)**: Real-time position tracking
- **Research Satellites**: Various scientific missions in Earth orbit

### What's NOT Available
The SSC database does **not** include:
- **GPS Satellites**: These are tracked by different systems
- **Hubble Space Telescope**: Not tracked by SSC
- **Commercial Satellites**: Limited coverage of commercial constellations

The SSC focuses primarily on space physics missions and scientific satellites.

## Coordinate Systems

### GEO (Geographic) - Used by Default
- **Earth-fixed coordinate system**
- Provides latitude, longitude, and altitude
- Most intuitive for human understanding
- Used for ground-based tracking and visualization

### Other Available Systems
The sscws package also supports:
- **GSE (Solar Ecliptic)**: Solar wind reference frame
- **GSM (Solar Magnetospheric)**: Magnetosphere reference frame

These are primarily used for space physics applications and scientific analysis.

## Limitations

- **Near Real-Time Data**: Position data may have slight delays (typically minutes)
- **Service Dependency**: Requires NASA SSC service availability
- **Limited Satellite Coverage**: Only includes satellites tracked by SSC
- **Network Requirements**: Requires internet connection to access NASA services

## Next Steps

This implementation now includes comprehensive visualization and CLI capabilities. Future enhancements could include:

- **3D Orbit Visualization**: Future enhancement for 3D globe view
- **Web Integration**: API endpoint for React dashboard
- **Data Export**: CSV/JSON output formats
- **Historical Playback**: Animate past satellite trajectories

## Troubleshooting

### Common Issues

**Network Connection Errors**
```
Error fetching satellite list: [Connection error]
```
- Check your internet connection
- Verify NASA SSC service is online: https://sscweb.gsfc.nasa.gov/

**Invalid Satellite IDs**
```
Error fetching satellite positions: [Invalid satellite ID]
```
- Run the script first to see available satellite IDs
- Ensure satellite IDs are lowercase (e.g., 'iss', not 'ISS')

**Empty Results**
```
No satellite data available.
```
- The satellite may not be tracked by SSC
- Try a different time window
- Check if the satellite is currently active

**Cartopy Installation Fails**
```
Error creating plot: [Cartopy installation error]
```
- Install system dependencies first (see Installation section)
- Try conda installation: `conda install -c conda-forge cartopy`
- Script still works without visualization features

**Plot Window Doesn't Appear**
- Check matplotlib backend settings
- Try setting backend: `export MPLBACKEND=TkAgg`
- On headless systems, use `--plot` flag may not work

**Real-Time Mode Freezes**
- Reduce update interval: `--update-interval 120`
- Reduce time window: `--time-window 0.5`
- Check system resources and network connection

### Checking Service Status
If you encounter persistent issues, check the NASA SSC Web Services status at:
https://sscweb.gsfc.nasa.gov/WebServices/REST/

## Files in This Directory

- `satellite_tracker.py`: Main script for fetching satellite positions
- `requirements.txt`: Python package dependencies
- `README.md`: This documentation file
- `.gitignore`: Git ignore rules for Python development
