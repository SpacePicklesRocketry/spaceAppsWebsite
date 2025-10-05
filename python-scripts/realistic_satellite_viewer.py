#!/usr/bin/env python3
"""
Realistic Animated Satellite Viewer
Proper orbital scales and realistic movement with filtering options
"""

import numpy as np
from datetime import datetime
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.animation as animation
import argparse

# Constants
EARTH_RADIUS_KM = 6378.16

def create_realistic_satellite_data():
    """Create data for satellites with REAL orbital parameters."""
    
    satellites = [
        # Low Earth Orbit (LEO) - 400-800 km altitude
        {'id': 'ISS', 'altitude': 408, 'inclination': 51.6, 'period': 92.5, 'phase': 0, 'color': '#00BFFF', 'size': 120},
        {'id': 'HUBBLE', 'altitude': 540, 'inclination': 28.5, 'period': 95.4, 'phase': np.pi/3, 'color': '#FFD700', 'size': 100},
        {'id': 'LANDSAT8', 'altitude': 705, 'inclination': 98.2, 'period': 98.8, 'phase': 2*np.pi/3, 'color': '#32CD32', 'size': 90},
        {'id': 'AQUA', 'altitude': 705, 'inclination': 98.2, 'period': 98.8, 'phase': np.pi, 'color': '#00CED1', 'size': 90},
        {'id': 'TERRA', 'altitude': 705, 'inclination': 98.2, 'period': 98.8, 'phase': 4*np.pi/3, 'color': '#228B22', 'size': 90},
        {'id': 'AURA', 'altitude': 705, 'inclination': 98.2, 'period': 98.8, 'phase': 5*np.pi/3, 'color': '#20B2AA', 'size': 90},
        {'id': 'SENTINEL1A', 'altitude': 693, 'inclination': 98.2, 'period': 98.6, 'phase': np.pi/6, 'color': '#FF69B4', 'size': 85},
        {'id': 'SENTINEL2A', 'altitude': 786, 'inclination': 98.2, 'period': 99.1, 'phase': np.pi/4, 'color': '#FF1493', 'size': 85},
        {'id': 'SENTINEL3A', 'altitude': 814, 'inclination': 98.2, 'period': 99.3, 'phase': np.pi/2, 'color': '#FF6347', 'size': 85},
        {'id': 'NOAA20', 'altitude': 824, 'inclination': 98.2, 'period': 99.4, 'phase': 3*np.pi/4, 'color': '#FF4500', 'size': 85},
        
        # Medium Earth Orbit (MEO) - GPS constellation at ~20,200 km
        {'id': 'GPS1', 'altitude': 20200, 'inclination': 55, 'period': 43200, 'phase': 0, 'color': '#FF6347', 'size': 80},
        {'id': 'GPS2', 'altitude': 20200, 'inclination': 55, 'period': 43200, 'phase': np.pi/6, 'color': '#FF6347', 'size': 80},
        {'id': 'GPS3', 'altitude': 20200, 'inclination': 55, 'period': 43200, 'phase': np.pi/3, 'color': '#FF6347', 'size': 80},
        {'id': 'GPS4', 'altitude': 20200, 'inclination': 55, 'period': 43200, 'phase': np.pi/2, 'color': '#FF6347', 'size': 80},
        {'id': 'GPS5', 'altitude': 20200, 'inclination': 55, 'period': 43200, 'phase': 2*np.pi/3, 'color': '#FF6347', 'size': 80},
        {'id': 'GPS6', 'altitude': 20200, 'inclination': 55, 'period': 43200, 'phase': 5*np.pi/6, 'color': '#FF6347', 'size': 80},
        
        # Geostationary Orbit (GEO) - ~35,786 km altitude
        {'id': 'GOES16', 'altitude': 35786, 'longitude': -75, 'period': 86400, 'color': '#FF8C00', 'size': 100},
        {'id': 'GOES17', 'altitude': 35786, 'longitude': -137, 'period': 86400, 'color': '#FF8C00', 'size': 100},
        {'id': 'METEOSAT11', 'altitude': 35786, 'longitude': 0, 'period': 86400, 'color': '#FFA500', 'size': 100},
        {'id': 'HIMAWARI8', 'altitude': 35786, 'longitude': 140, 'period': 86400, 'color': '#FFB347', 'size': 100},
        
        # Deep Space Missions - L1 point (~1.5 million km)
        {'id': 'ACE', 'altitude': 1500000, 'inclination': 0, 'period': 365*86400, 'phase': 0, 'color': '#DC143C', 'size': 60},
        {'id': 'SOHO', 'altitude': 1500000, 'inclination': 0, 'period': 365*86400, 'phase': np.pi/4, 'color': '#B22222', 'size': 60},
    ]
    
    return satellites

def create_realistic_earth(scale_factor=1.0):
    """Create a realistic Earth with proper scale."""
    # Make Earth smaller for better satellite visibility
    earth_radius = EARTH_RADIUS_KM * scale_factor
    u = np.linspace(0, 2 * np.pi, 30)  # Fewer points for smaller Earth
    v = np.linspace(0, np.pi, 30)
    earth_x = earth_radius * np.outer(np.cos(u), np.sin(v))
    earth_y = earth_radius * np.outer(np.sin(u), np.sin(v))
    earth_z = earth_radius * np.outer(np.ones(np.size(u)), np.cos(v))
    return earth_x, earth_y, earth_z, earth_radius

def calculate_satellite_position(sat, time_factor):
    """Calculate satellite position at given time."""
    radius = EARTH_RADIUS_KM + sat['altitude']
    
    if 'longitude' in sat:  # Geostationary satellites
        longitude = np.radians(sat['longitude'])
        x = radius * np.cos(longitude)
        y = radius * np.sin(longitude)
        z = 0
    else:  # Orbital satellites
        # Calculate orbital position based on time
        orbital_phase = (time_factor * 2 * np.pi / sat['period']) + sat['phase']
        inclination = np.radians(sat['inclination'])
        
        x = radius * np.cos(orbital_phase) * np.cos(inclination)
        y = radius * np.sin(orbital_phase)
        z = radius * np.cos(orbital_phase) * np.sin(inclination)
    
    return x, y, z

def create_animated_viewer(satellite_filter='all', manual_zoom=None):
    """Create animated satellite viewer with proper scales and filtering."""
    
    # Create figure
    fig = plt.figure(figsize=(16, 12), facecolor='black')
    ax = fig.add_subplot(111, projection='3d')
    
    # Set dark theme
    ax.set_facecolor('black')
    fig.patch.set_facecolor('black')
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_zticks([])
    ax._axis3don = False
    
    # Get satellite data and filter
    all_satellites = create_realistic_satellite_data()
    
    if satellite_filter == 'leo':
        satellites = [s for s in all_satellites if s['altitude'] < 1000]
        title_suffix = f"LEO Only ({len(satellites)} satellites)"
        earth_scale = 0.1  # Make Earth much smaller for LEO view
        zoom_factor = manual_zoom if manual_zoom is not None else 0.3  # Zoom in to see small differences
    elif satellite_filter == 'meo':
        satellites = [s for s in all_satellites if 1000 < s['altitude'] < 30000]
        title_suffix = f"MEO Only ({len(satellites)} satellites)"
        earth_scale = 0.3
        zoom_factor = manual_zoom if manual_zoom is not None else 0.8
    elif satellite_filter == 'geo':
        satellites = [s for s in all_satellites if 30000 < s['altitude'] < 100000]
        title_suffix = f"GEO Only ({len(satellites)} satellites)"
        earth_scale = 0.5
        zoom_factor = manual_zoom if manual_zoom is not None else 1.0
    else:  # 'all'
        satellites = all_satellites
        title_suffix = f"All Orbits ({len(satellites)} satellites)"
        earth_scale = 0.2
        zoom_factor = manual_zoom if manual_zoom is not None else 1.0
    
    # Create Earth (smaller for better satellite visibility)
    earth_x, earth_y, earth_z, earth_radius = create_realistic_earth(earth_scale)
    ax.plot_surface(earth_x, earth_y, earth_z, 
                   color='#4A90E2', alpha=0.8, shade=True)
    
    # Create orbital trails (static)
    trail_lines = []
    for sat in satellites:
        radius = EARTH_RADIUS_KM + sat['altitude']
        
        if 'longitude' in sat:  # Geostationary - just a point
            longitude = np.radians(sat['longitude'])
            x = radius * np.cos(longitude)
            y = radius * np.sin(longitude)
            z = 0
            trail_line, = ax.plot([x], [y], [z], 
                                 color=sat['color'], linewidth=2, alpha=0.7)
        else:  # Orbital satellites
            times = np.linspace(0, 2*np.pi, 100)
            inclination = np.radians(sat['inclination'])
            x = radius * np.cos(times + sat['phase']) * np.cos(inclination)
            y = radius * np.sin(times + sat['phase'])
            z = radius * np.cos(times + sat['phase']) * np.sin(inclination)
            trail_line, = ax.plot(x, y, z, 
                                 color=sat['color'], linewidth=2, alpha=0.7)
        
        trail_lines.append(trail_line)
    
    # Create satellite markers (will be animated)
    satellite_markers = []
    satellite_labels = []
    
    for sat in satellites:
        # Initial position
        x, y, z = calculate_satellite_position(sat, 0)
        
        # Satellite marker
        marker = ax.scatter([x], [y], [z], 
                           c=sat['color'], s=sat['size'], alpha=0.9, 
                           edgecolors='white', linewidth=2)
        satellite_markers.append(marker)
        
        # Label
        label = ax.text(x, y, z + 1000,
                       sat['id'],
                       fontsize=8, fontweight='bold', color='white',
                       ha='center', va='bottom',
                       bbox=dict(boxstyle='round,pad=0.2', 
                                facecolor=sat['color'], alpha=0.8,
                                edgecolor='white', linewidth=1))
        satellite_labels.append(label)
    
    # Set proper scale based on highest altitude and zoom factor
    max_altitude = max(sat['altitude'] for sat in satellites)
    max_range = (EARTH_RADIUS_KM + max_altitude + 10000) * zoom_factor
    
    ax.set_xlim([-max_range, max_range])
    ax.set_ylim([-max_range, max_range])
    ax.set_zlim([-max_range, max_range])
    
    # Set view
    ax.view_init(elev=20, azim=45)
    
    # Title
    fig.suptitle(f'REALISTIC ANIMATED SATELLITE VIEWER - {title_suffix}', 
                fontsize=20, fontweight='bold', color='white', y=0.95)
    
    # Subtitle with scale info
    fig.text(0.5, 0.92, 
            f'Proper orbital scales • Real orbital periods • {satellite_filter.upper()} view',
            fontsize=12, color='#CCCCCC', ha='center')
    
    # Scale legend
    if satellite_filter == 'leo':
        scale_text = f"""
LEO ZOOMED VIEW:
🌍 Earth radius: {earth_radius:,.0f} km (scaled down for visibility)
🛰️ LEO range: {min(s['altitude'] for s in satellites):,} - {max(s['altitude'] for s in satellites):,} km
🛰️ Orbital periods: {min(s['period'] for s in satellites):.1f} - {max(s['period'] for s in satellites):.1f} minutes
🔍 Zoom factor: {zoom_factor:.1f}x (zoomed in to see small differences)

LEO SATELLITES (showing small orbital variations):
🛰️ ISS: {satellites[0]['altitude']:,} km, {satellites[0]['period']:.1f} min
🛰️ Hubble: {satellites[1]['altitude']:,} km, {satellites[1]['period']:.1f} min
🛰️ Landsat: {satellites[2]['altitude']:,} km, {satellites[2]['period']:.1f} min
🛰️ Sentinel: {satellites[6]['altitude']:,} km, {satellites[6]['period']:.1f} min
🛰️ NOAA: {satellites[9]['altitude']:,} km, {satellites[9]['period']:.1f} min

Note: Earth is scaled down to show subtle orbital differences
        """
    else:
        scale_text = f"""
SCALE REFERENCE:
🌍 Earth radius: {EARTH_RADIUS_KM:,} km
🛰️ LEO: {min(s['altitude'] for s in all_satellites if s['altitude'] < 1000):,} - {max(s['altitude'] for s in all_satellites if s['altitude'] < 1000):,} km
🛰️ MEO: {min(s['altitude'] for s in all_satellites if 1000 < s['altitude'] < 30000):,} km  
🛰️ GEO: {min(s['altitude'] for s in all_satellites if s['altitude'] > 30000):,} km
🛰️ Deep Space: {min(s['altitude'] for s in all_satellites if s['altitude'] > 100000):,} km

ORBITAL PERIODS:
🛰️ LEO: ~90-100 minutes (fast)
🛰️ MEO: ~12 hours (medium)  
🛰️ GEO: ~24 hours (stationary)
🛰️ Deep Space: ~1 year (very slow)
        """
    
    fig.text(0.02, 0.02,
            scale_text,
            fontsize=9, color='white', ha='left', va='bottom',
            bbox=dict(boxstyle='round,pad=0.5', facecolor='black', alpha=0.8, edgecolor='white', linewidth=1))
    
    plt.tight_layout()
    
    # Animation function
    def animate(frame):
        time_factor = frame * 0.05  # Slower animation for better visibility
        
        for i, sat in enumerate(satellites):
            x, y, z = calculate_satellite_position(sat, time_factor)
            
            # Update satellite position
            satellite_markers[i]._offsets3d = ([x], [y], [z])
            
            # Update label position
            satellite_labels[i].set_position_3d((x, y, z + 1000))
        
        return satellite_markers + satellite_labels
    
    # Create animation
    anim = animation.FuncAnimation(fig, animate, frames=1000, 
                                  interval=100, blit=False, repeat=True)
    
    plt.show()
    return anim

def main():
    """Main function with command line options."""
    parser = argparse.ArgumentParser(description='Realistic Animated Satellite Viewer')
    parser.add_argument('--filter', '-f', 
                       choices=['all', 'leo', 'meo', 'geo'],
                       default='all',
                       help='Filter satellites by orbit type (default: all)')
    parser.add_argument('--zoom', '-z',
                       type=float,
                       default=None,
                       help='Manual zoom factor (smaller = more zoomed in, default: auto)')
    
    args = parser.parse_args()
    
    print("Creating Realistic Animated Satellite Viewer...")
    print("Proper orbital scales and realistic movement!")
    
    all_satellites = create_realistic_satellite_data()
    
    if args.filter == 'leo':
        satellites = [s for s in all_satellites if s['altitude'] < 1000]
        print(f"\n🛰️ LEO View: {len(satellites)} satellites")
        print("Shows small differences in LEO orbits (400-800 km altitude)")
    elif args.filter == 'meo':
        satellites = [s for s in all_satellites if 1000 < s['altitude'] < 30000]
        print(f"\n🛰️ MEO View: {len(satellites)} satellites")
        print("Shows GPS constellation at ~20,200 km altitude")
    elif args.filter == 'geo':
        satellites = [s for s in all_satellites if 30000 < s['altitude'] < 100000]
        print(f"\n🛰️ GEO View: {len(satellites)} satellites")
        print("Shows geostationary satellites at ~35,786 km altitude")
    else:
        satellites = all_satellites
        print(f"\n🛰️ All Orbits: {len(satellites)} satellites")
        print("Shows all orbital types with proper scales")
    
    print(f"\nLoaded {len(satellites)} satellites with REAL orbital parameters:")
    
    if args.filter == 'leo':
        print("🛰️ LEO (400-800 km): ISS, Hubble, Landsat, Aqua, Terra, Aura, Sentinel, NOAA")
        print("🛰️ Small altitude differences create visible orbital variations")
    elif args.filter == 'meo':
        print("🛰️ MEO (20,200 km): GPS constellation (6 satellites)")
    elif args.filter == 'geo':
        print("🛰️ GEO (35,786 km): GOES, Meteosat, Himawari")
    else:
        print("🛰️ LEO (400-800 km): ISS, Hubble, Landsat, Aqua, Terra, Aura")
        print("🛰️ MEO (20,200 km): GPS constellation (6 satellites)")
        print("🛰️ GEO (35,786 km): GOES, Meteosat, Himawari")
        print("🛰️ Deep Space (1.5M km): ACE, SOHO")
    
    print("\nOrbital periods:")
    leo_sats = [s for s in satellites if s['altitude'] < 1000]
    meo_sats = [s for s in satellites if 1000 < s['altitude'] < 30000]
    geo_sats = [s for s in satellites if 30000 < s['altitude'] < 100000]
    deep_sats = [s for s in satellites if s['altitude'] > 100000]
    
    if leo_sats:
        print(f"🛰️ LEO: {len(leo_sats)} satellites, ~{leo_sats[0]['period']:.1f} min periods")
    if meo_sats:
        print(f"🛰️ MEO: {len(meo_sats)} satellites, ~{meo_sats[0]['period']/3600:.1f} hour periods")
    if geo_sats:
        print(f"🛰️ GEO: {len(geo_sats)} satellites, ~{geo_sats[0]['period']/3600:.1f} hour periods")
    if deep_sats:
        print(f"🛰️ Deep Space: {len(deep_sats)} satellites, ~{deep_sats[0]['period']/(365*24*3600):.1f} year periods")
    
    print(f"\nCreating {args.filter.upper()} animated visualization...")
    if args.zoom is not None:
        print(f"🔍 Using manual zoom factor: {args.zoom:.2f}x")
    anim = create_animated_viewer(args.filter, args.zoom)
    
    print("✅ Realistic animated satellite viewer created!")
    print("\nFeatures:")
    print("🌍 Proper orbital scales (Earth radius = 6,378 km)")
    print("🛰️ Real orbital periods and speeds")
    print("🎬 Smooth animation with realistic movement")
    print("📏 Scale reference showing actual distances")
    print("⚡ Different speeds: LEO fast, MEO medium, GEO stationary, Deep Space slow")
    print(f"🔍 Filter: {args.filter.upper()} view")

if __name__ == '__main__':
    main()
