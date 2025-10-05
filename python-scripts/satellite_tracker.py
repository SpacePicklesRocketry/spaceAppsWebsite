#!/usr/bin/env python3
"""
Satellite Position Tracker using NASA SSC Web Services

This script fetches satellite position data from NASA's Satellite Situation Center (SSC)
using the sscws package. It can list available satellites and fetch their current
positions with latitude, longitude, and altitude information.
"""

from sscws.sscws import SscWs
from sscws.coordinates import CoordinateSystem
from datetime import datetime, timedelta
import numpy as np
import argparse
import time

# Constants
EARTH_RADIUS_KM = 6378.16


def list_available_satellites():
    """
    Retrieve and display all available satellites from NASA SSC.
    
    Returns:
        list: List of Observatory objects containing satellite information
    """
    try:
        # Create SSC Web Services client
        client = SscWs()
        
        # Get all available observatories (satellites)
        response = client.get_observatories()
        observatories = response['Observatory']
        
        print("=" * 60)
        print("AVAILABLE SATELLITES FROM NASA SSC")
        print("=" * 60)
        print(f"{'ID':<15} {'Name':<40}")
        print("-" * 60)
        
        for obs in observatories:
            print(f"{obs['Id']:<15} {obs['Name']:<40}")
        
        print(f"\nTotal satellites available: {len(observatories)}")
        print("=" * 60)
        
        return observatories
        
    except Exception as e:
        print(f"Error fetching satellite list: {e}")
        return []


def fetch_satellite_positions(satellite_ids, time_window_hours=1):
    """
    Fetch position data for specified satellites within a time window.
    
    Args:
        satellite_ids (list): List of satellite IDs to track (e.g., ['iss'])
        time_window_hours (float): Time window in hours (default: 1, supports fractional hours)
    
    Returns:
        list: List of dictionaries containing satellite position data
    """
    try:
        # Calculate time range
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(hours=time_window_hours)
        
        # Format times as ISO 8601 UTC strings
        start_time_str = start_time.strftime('%Y-%m-%dT%H:%M:%SZ')
        end_time_str = end_time.strftime('%Y-%m-%dT%H:%M:%SZ')
        
        print(f"\nFetching positions from {start_time_str} to {end_time_str}")
        print(f"Time window: {time_window_hours} hour(s)")
        
        # Create SSC Web Services client
        client = SscWs()
        
        # Fetch satellite positions using GEO coordinate system
        result = client.get_locations(
            satellite_ids,
            [start_time_str, end_time_str],
            coords=[CoordinateSystem.GEO]
        )
        
        satellite_data = []
        
        if 'Data' in result and result['Data']:
            for idx, data_i in enumerate(result['Data']):
                satellite_id = data_i['Id']
                times = data_i['Time']
                
                # Select GEO coordinates with proper error handling
                geo = next((c for c in data_i['Coordinates'] if c['CoordinateSystem'].value.lower() == 'geo'), None)
                if not geo:
                    continue  # Skip if no GEO coordinates found
                
                # Extract position arrays
                latitudes = np.array(geo['LAT'])
                longitudes = np.array(geo['LON'])
                x_coords = np.array(geo['X'])
                y_coords = np.array(geo['Y'])
                z_coords = np.array(geo['Z'])
                
                # Calculate altitude from X, Y, Z coordinates
                # Note: GEO X/Y/Z coordinates from SSC are in Earth radii units
                # Convert to kilometers: dist_km = distances * EARTH_RADIUS_KM
                distances = np.sqrt(x_coords**2 + y_coords**2 + z_coords**2)
                distances_km = distances * EARTH_RADIUS_KM
                altitudes = distances_km - EARTH_RADIUS_KM
                
                satellite_data.append({
                    'id': satellite_id,
                    'latitudes': latitudes,
                    'longitudes': longitudes,
                    'altitudes': altitudes,
                    'times': times
                })
        
        return satellite_data
        
    except Exception as e:
        print(f"Error fetching satellite positions: {e}")
        return []


def print_satellite_data(satellite_data):
    """
    Print formatted satellite position data.
    
    Args:
        satellite_data (list): List of satellite data dictionaries from fetch_satellite_positions()
    """
    if not satellite_data:
        print("No satellite data available.")
        return
    
    print("\n" + "=" * 80)
    print("SATELLITE POSITION DATA")
    print("=" * 80)
    
    for sat in satellite_data:
        print(f"\nSatellite: {sat['id'].upper()}")
        print("-" * 40)
        
        # Get the most recent position (last element in arrays)
        if len(sat['times']) > 0:
            latest_idx = -1
            latest_time = sat['times'][latest_idx]
            latest_lat = sat['latitudes'][latest_idx]
            latest_lon = sat['longitudes'][latest_idx]
            latest_alt = sat['altitudes'][latest_idx]
            
            # Convert longitude to 0-360 format if needed
            if latest_lon < 0:
                latest_lon += 360
            
            print(f"Timestamp:    {latest_time}")
            print(f"Latitude:     {latest_lat:.3f}°")
            print(f"Longitude:    {latest_lon:.3f}°")
            print(f"Altitude:     {latest_alt:.2f} km")
        else:
            print("No position data available")
    
    print("\n" + "=" * 80)


def _make_base_map():
    """
    Create a base map with cartopy PlateCarree projection and Earth features.
    
    Returns:
        tuple: (fig, ax) matplotlib figure and axes objects
    """
    import matplotlib.pyplot as plt
    import cartopy.crs as ccrs
    import cartopy.feature as cfeature
    
    # Create figure with cartopy PlateCarree projection
    fig = plt.figure(figsize=(12, 8))
    ax = plt.axes(projection=ccrs.PlateCarree())
    
    # Add Earth features
    ax.add_feature(cfeature.COASTLINE, linewidth=0.5)
    ax.add_feature(cfeature.BORDERS, linewidth=0.3)
    ax.add_feature(cfeature.LAND, alpha=0.3, color='lightgray')
    ax.add_feature(cfeature.OCEAN, alpha=0.3, color='lightblue')
    ax.gridlines(draw_labels=True, dms=True, x_inline=False, y_inline=False)
    
    # Set global extent
    ax.set_global()
    
    return fig, ax


def _draw_satellites(ax, satellite_data, show_trajectory=True):
    """
    Draw satellite positions and trajectories on the given axes.
    
    Args:
        ax: matplotlib axes object with cartopy projection
        satellite_data (list): List of satellite data dictionaries
        show_trajectory (bool): Whether to show trajectory paths (default: True)
    """
    import matplotlib.pyplot as plt
    import cartopy.crs as ccrs
    
    # Color cycle for multiple satellites (supports up to 20 distinct colors)
    colors = plt.cm.tab20(np.linspace(0, 1, len(satellite_data)))
    
    for idx, sat in enumerate(satellite_data):
        color = colors[idx]
        
        # Normalize longitudes for plotting to avoid wrap/artifacts around ±180°
        plot_lons = ((sat['longitudes'] + 180) % 360) - 180
        
        # Plot satellite positions
        ax.scatter(plot_lons, sat['latitudes'], 
                  c=[color], s=50, alpha=0.8, 
                  transform=ccrs.PlateCarree(),
                  label=sat['id'].upper(),
                  edgecolors='black', linewidth=0.5)
        
        # Plot trajectory if requested
        if show_trajectory and len(plot_lons) > 1:
            ax.plot(plot_lons, sat['latitudes'], 
                   color=color, alpha=0.6, linewidth=1.5,
                   transform=ccrs.PlateCarree())
        
        # Add satellite name label at most recent position
        if len(plot_lons) > 0:
            latest_lon = plot_lons[-1]
            latest_lat = sat['latitudes'][-1]
            ax.annotate(sat['id'].upper(), 
                       xy=(latest_lon, latest_lat),
                       xytext=(5, 5), textcoords='offset points',
                       fontsize=8, fontweight='bold',
                       bbox=dict(boxstyle='round,pad=0.3', facecolor=color, alpha=0.7),
                       transform=ccrs.PlateCarree())


def plot_3d_satellites(satellite_data):
    """
    Create a 3D visualization of satellite positions around Earth.
    
    Args:
        satellite_data (list): List of satellite data dictionaries from fetch_satellite_positions()
    """
    try:
        import matplotlib.pyplot as plt
        from mpl_toolkits.mplot3d import Axes3D
        
        fig = plt.figure(figsize=(14, 10))
        ax = fig.add_subplot(111, projection='3d')
        
        # Create Earth sphere
        u = np.linspace(0, 2 * np.pi, 50)
        v = np.linspace(0, np.pi, 50)
        earth_x = EARTH_RADIUS_KM * np.outer(np.cos(u), np.sin(v))
        earth_y = EARTH_RADIUS_KM * np.outer(np.sin(u), np.sin(v))
        earth_z = EARTH_RADIUS_KM * np.outer(np.ones(np.size(u)), np.cos(v))
        
        ax.plot_surface(earth_x, earth_y, earth_z, 
                       color='lightblue', alpha=0.6, 
                       label='Earth')
        
        # Color cycle for multiple satellites
        colors = plt.cm.tab20(np.linspace(0, 1, len(satellite_data)))
        
        for idx, sat in enumerate(satellite_data):
            color = colors[idx]
            
            # Convert lat/lon to 3D coordinates
            # Use altitude to determine radius
            radius = EARTH_RADIUS_KM + sat['altitudes']
            
            # Convert spherical to Cartesian coordinates
            x = radius * np.cos(np.radians(sat['latitudes'])) * np.cos(np.radians(sat['longitudes']))
            y = radius * np.cos(np.radians(sat['latitudes'])) * np.sin(np.radians(sat['longitudes']))
            z = radius * np.sin(np.radians(sat['latitudes']))
            
            # Plot orbit trajectory
            ax.plot(x, y, z, 
                   color=color, linewidth=2, alpha=0.8,
                   label=sat['id'].upper())
            
            # Plot current position
            ax.scatter(x[-1], y[-1], z[-1], 
                      color=color, s=100, edgecolors='black', linewidth=1)
            
            # Add altitude annotation
            ax.text(x[-1], y[-1], z[-1] + 1000,
                   f"{sat['id'].upper()}\n{sat['altitudes'][-1]:.0f} km",
                   fontsize=8, ha='center')
        
        # Set equal aspect ratio
        max_range = 50000  # km
        ax.set_xlim([-max_range, max_range])
        ax.set_ylim([-max_range, max_range])
        ax.set_zlim([-max_range, max_range])
        
        # Labels and title
        ax.set_xlabel('X (km)', fontsize=12)
        ax.set_ylabel('Y (km)', fontsize=12)
        ax.set_zlabel('Z (km)', fontsize=12)
        ax.set_title(f'3D Satellite Positions - {datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")} UTC', 
                    fontsize=14, fontweight='bold')
        
        # Legend
        ax.legend(loc='upper left', bbox_to_anchor=(0.02, 0.98))
        
        plt.tight_layout()
        plt.show()
        
    except ImportError as e:
        print(f"Error: Required plotting libraries not installed: {e}")
        print("To enable 3D visualization, install matplotlib:")
        print("  pip install matplotlib")
        print("The script still works without visualization features.")
    except Exception as e:
        print(f"Error creating 3D plot: {e}")


def plot_modern_satellites(satellite_data):
    """
    Create a modern, STL-viewer-style satellite visualization.
    
    Args:
        satellite_data (list): List of satellite data dictionaries from fetch_satellite_positions()
    """
    try:
        import matplotlib.pyplot as plt
        from mpl_toolkits.mplot3d import Axes3D
        import matplotlib.animation as animation
        
        # Create modern dark-themed figure
        fig = plt.figure(figsize=(16, 12), facecolor='black')
        ax = fig.add_subplot(111, projection='3d')
        
        # Set dark theme
        ax.set_facecolor('black')
        fig.patch.set_facecolor('black')
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_zticks([])
        ax._axis3don = False
        
        # Create realistic Earth
        u = np.linspace(0, 2 * np.pi, 100)
        v = np.linspace(0, np.pi, 100)
        earth_x = EARTH_RADIUS_KM * np.outer(np.cos(u), np.sin(v))
        earth_y = EARTH_RADIUS_KM * np.outer(np.sin(u), np.sin(v))
        earth_z = EARTH_RADIUS_KM * np.outer(np.ones(np.size(u)), np.cos(v))
        
        # Earth with atmospheric glow
        ax.plot_surface(earth_x, earth_y, earth_z, 
                       color='#4A90E2', alpha=0.8, shade=True)
        
        # Atmospheric glow
        atm_radius = EARTH_RADIUS_KM * 1.05
        atm_x = atm_radius * np.outer(np.cos(u), np.sin(v))
        atm_y = atm_radius * np.outer(np.sin(u), np.sin(v))
        atm_z = atm_radius * np.outer(np.ones(np.size(u)), np.cos(v))
        
        ax.plot_surface(atm_x, atm_y, atm_z, 
                       color='#87CEEB', alpha=0.1, shade=False)
        
        # Color cycle for satellites
        colors = plt.cm.tab20(np.linspace(0, 1, len(satellite_data)))
        
        # Plot satellites with modern styling
        for idx, sat in enumerate(satellite_data):
            color = colors[idx]
            
            # Convert lat/lon to 3D coordinates
            radius = EARTH_RADIUS_KM + sat['altitudes']
            x = radius * np.cos(np.radians(sat['latitudes'])) * np.cos(np.radians(sat['longitudes']))
            y = radius * np.cos(np.radians(sat['latitudes'])) * np.sin(np.radians(sat['longitudes']))
            z = radius * np.sin(np.radians(sat['latitudes']))
            
            # Beautiful orbital trail
            ax.plot(x, y, z, 
                   color=color, linewidth=3, alpha=0.7)
            
            # Glow effect trail
            ax.plot(x, y, z, 
                   color=color, linewidth=8, alpha=0.2)
            
            # Satellite marker with glow
            ax.scatter(x[-1], y[-1], z[-1], 
                      c=color, s=100, alpha=0.9, 
                      edgecolors='white', linewidth=2)
            
            # Glow effect around satellite
            ax.scatter(x[-1], y[-1], z[-1], 
                      c=color, s=300, alpha=0.3)
            
            # Modern label styling
            ax.text(x[-1], y[-1], z[-1] + 2000,
                   sat['id'].upper(),
                   fontsize=10, fontweight='bold', color='white',
                   ha='center', va='bottom',
                   bbox=dict(boxstyle='round,pad=0.3', 
                            facecolor=color, alpha=0.8,
                            edgecolor='white', linewidth=1))
        
        # Set view
        ax.view_init(elev=20, azim=45)
        max_range = 50000
        ax.set_xlim([-max_range, max_range])
        ax.set_ylim([-max_range, max_range])
        ax.set_zlim([-max_range, max_range])
        
        # Modern title
        fig.suptitle('MODERN SATELLITE VIEWER', 
                    fontsize=24, fontweight='bold', color='white', y=0.95)
        
        # Subtitle
        fig.text(0.5, 0.92, 
                f'Real-time satellite tracking • {len(satellite_data)} satellites • {datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")} UTC',
                fontsize=12, color='#CCCCCC', ha='center')
        
        plt.tight_layout()
        plt.show()
        
    except ImportError as e:
        print(f"Error: Required plotting libraries not installed: {e}")
        print("To enable modern visualization, install matplotlib:")
        print("  pip install matplotlib")
        print("The script still works without visualization features.")
    except Exception as e:
        print(f"Error creating modern plot: {e}")


def plot_satellite_positions(satellite_data, show_trajectory=True):
    """
    Create a 2D Earth map visualization of satellite positions.
    
    Args:
        satellite_data (list): List of satellite data dictionaries from fetch_satellite_positions()
        show_trajectory (bool): Whether to show trajectory paths (default: True)
    """
    try:
        import matplotlib.pyplot as plt
        
        # Create base map
        fig, ax = _make_base_map()
        
        # Draw satellites
        _draw_satellites(ax, satellite_data, show_trajectory)
        
        # Add title and legend
        plt.title(f'Satellite Positions - {datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")} UTC', 
                 fontsize=14, fontweight='bold')
        plt.legend(loc='upper right', bbox_to_anchor=(1.15, 1))
        
        plt.tight_layout()
        plt.show()
        
    except ImportError as e:
        print(f"Error: Required plotting libraries not installed: {e}")
        print("To enable visualization, install matplotlib and cartopy:")
        print("  pip install matplotlib cartopy")
        print("Note: cartopy requires additional system dependencies.")
        print("The script still works without visualization features.")
    except Exception as e:
        print(f"Error creating plot: {e}")
        print("Note: Make sure cartopy is properly installed. The script still works without visualization.")


def plot_realtime_updates(satellite_ids, update_interval=60, time_window_hours=1):
    """
    Create real-time satellite position visualization with periodic updates.
    
    Args:
        satellite_ids (list): List of satellite IDs to track
        update_interval (int): Seconds between updates (default: 60)
        time_window_hours (float): Time window in hours (default: 1, supports fractional hours)
    """
    try:
        # Lazy import matplotlib and cartopy
        import matplotlib.pyplot as plt
        import cartopy.crs as ccrs
        import cartopy.feature as cfeature
        
        # Enable interactive mode
        plt.ion()
        
        print(f"\nStarting real-time tracking...")
        print(f"Update interval: {update_interval} seconds")
        print(f"Time window: {time_window_hours} hour(s)")
        print("Press Ctrl+C to stop")
        
        while True:
            try:
                # Fetch fresh satellite data
                satellite_data = fetch_satellite_positions(satellite_ids, time_window_hours)
                
                if satellite_data:
                    # Clear current plot
                    plt.clf()
                    
                    # Create new plot using helper function
                    fig, ax = _make_base_map()
                    
                    # Draw satellites
                    _draw_satellites(ax, satellite_data, True)  # Always show trajectory in realtime
                    
                    # Update title and legend
                    plt.title(f'Real-Time Satellite Tracking - {datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")} UTC', 
                             fontsize=14, fontweight='bold')
                    plt.legend(loc='upper right', bbox_to_anchor=(1.15, 1))
                    
                    plt.tight_layout()
                    plt.draw()
                    plt.pause(0.1)
                    
                    print(f"Updated at {datetime.utcnow().strftime('%H:%M:%S')} UTC")
                
                # Wait for next update
                time.sleep(update_interval)
                
            except KeyboardInterrupt:
                print("\nReal-time tracking stopped by user.")
                break
            except Exception as e:
                print(f"Error during real-time update: {e}")
                time.sleep(update_interval)
        
        plt.ioff()
        
    except ImportError as e:
        print(f"Error: Required plotting libraries not installed: {e}")
        print("To enable visualization, install matplotlib and cartopy:")
        print("  pip install matplotlib cartopy")
        print("Note: cartopy requires additional system dependencies.")
        print("The script still works without visualization features.")
    except Exception as e:
        print(f"Error in real-time mode: {e}")
        print("Note: Make sure cartopy is properly installed.")


if __name__ == '__main__':
    # Set up argument parser
    parser = argparse.ArgumentParser(
        description='NASA SSC Satellite Position Tracker with Visualization',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python satellite_tracker.py                    # Track ALL satellites (no visualization)
  python satellite_tracker.py --plot             # Track ALL satellites (2D visualization)
  python satellite_tracker.py --plot --3d        # Track ALL satellites (3D visualization)
  python satellite_tracker.py --plot --modern   # Track ALL satellites (modern STL-viewer style)
  python satellite_tracker.py -s iss ace --plot # Track specific satellites only
  python satellite_tracker.py --realtime -u 30   # Real-time updates every 30s (ALL satellites)
  python satellite_tracker.py --list-satellites  # List all available satellites
'''
    )
    
    parser.add_argument('--satellites', '-s', 
                       nargs='+', 
                       default=['all'],
                       help='Satellite IDs to track (space-separated, default: all)')
    parser.add_argument('--time-window', '-t', 
                       type=float, 
                       default=1,
                       help='Time window in hours (default: 1, supports fractional hours)')
    parser.add_argument('--plot', '-p', 
                       action='store_true',
                       help='Enable visualization plotting')
    parser.add_argument('--realtime', '-r', 
                       action='store_true',
                       help='Enable real-time updates')
    parser.add_argument('--update-interval', '-u', 
                       type=int, 
                       default=60,
                       help='Update interval in seconds for realtime mode (default: 60)')
    parser.add_argument('--list-satellites', '-l', 
                       action='store_true',
                       help='List all available satellites and exit')
    parser.add_argument('--trajectory', 
                       dest='trajectory', 
                       action='store_true', 
                       default=True,
                       help='Show trajectory path (default: enabled)')
    parser.add_argument('--no-trajectory', 
                       dest='trajectory', 
                       action='store_false',
                       help='Disable trajectory path')
    parser.add_argument('--3d', 
                       action='store_true',
                       help='Enable 3D visualization (requires matplotlib)')
    parser.add_argument('--modern', 
                       action='store_true',
                       help='Enable modern STL-viewer style visualization with animations')
    
    # Parse arguments
    args = parser.parse_args()
    
    try:
        print("NASA SSC Satellite Position Tracker")
        print("===================================")
        print("This script fetches satellite position data from NASA's")
        print("Satellite Situation Center (SSC) Web Services.")
        
        # Handle list satellites option
        if args.list_satellites:
            list_available_satellites()
            exit(0)
        
        # Determine which satellites to track
        if 'all' in args.satellites:
            print("\nFetching all available satellites...")
            all_satellites = list_available_satellites()
            if all_satellites:
                # Extract satellite IDs from the observatories
                satellite_ids = [obs['Id'] for obs in all_satellites]
                print(f"\nTracking ALL {len(satellite_ids)} satellites")
            else:
                print("Could not fetch satellite list, using default satellites")
                satellite_ids = ['iss', 'ace', 'wind', 'goes16', 'hubble']
        else:
            satellite_ids = args.satellites
            print(f"\nTracking satellites: {', '.join(satellite_ids)}")
        
        print(f"Time window: {args.time_window} hour(s)")
        
        if args.plot:
            if hasattr(args, 'threed') and args.threed:
                print("Visualization mode: ENABLED (3D)")
            else:
                print("Visualization mode: ENABLED (2D)")
            if args.realtime:
                print(f"Real-time mode: ENABLED (update every {args.update_interval}s)")
        else:
            print("Visualization mode: DISABLED (use --plot to enable)")
        
        # Fetch satellite data
        satellite_data = fetch_satellite_positions(satellite_ids, args.time_window)
        
        # Display the results to console
        print_satellite_data(satellite_data)
        
        # Handle visualization
        if args.plot and satellite_data:
            if args.realtime:
                plot_realtime_updates(satellite_ids, args.update_interval, args.time_window)
            elif hasattr(args, 'modern') and args.modern:
                plot_modern_satellites(satellite_data)
            elif hasattr(args, 'threed') and args.threed:
                plot_3d_satellites(satellite_data)
            else:
                plot_satellite_positions(satellite_data, args.trajectory)
        elif args.plot and not satellite_data:
            print("No satellite data available for plotting.")
        
        print(f"\nData source: NASA Satellite Situation Center (SSC)")
        print(f"Generated at: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC")
        
        if not args.plot:
            print("\nTip: Use --plot to enable visualization or --help for more options.")
        
    except Exception as e:
        print(f"Script error: {e}")
        print("Please check your internet connection and try again.")
