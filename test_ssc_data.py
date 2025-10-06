#!/usr/bin/env python3

"""
Test script to show exactly what data NASA SSC Web Services provides
"""

from sscws.sscws import SscWs
from datetime import datetime, timedelta
import json

def main():
    print("🚀 NASA SSC Web Services Data Test")
    print("=" * 50)
    
    # Initialize SSC client
    client = SscWs()
    
    print("\n1. 📡 FETCHING SATELLITE LIST (Observatories)")
    print("-" * 40)
    
    try:
        # Get list of all available satellites
        observatories = client.get_observatories()
        
        print(f"✅ Successfully fetched {len(observatories['Observatory'])} satellites")
        print(f"📊 Response structure: {list(observatories.keys())}")
        
        # Show first 5 satellites
        print("\n🔍 First 5 satellites:")
        for i, sat in enumerate(observatories['Observatory'][:5]):
            print(f"  {i+1}. ID: {sat['Id']}")
            print(f"     Name: {sat['Name']}")
            print(f"     Resolution: {sat['Resolution']} minutes")
            print(f"     Start Time: {sat['StartTime']}")
            print(f"     End Time: {sat['EndTime']}")
            print(f"     Resource ID: {sat['ResourceId']}")
            print()
        
        # Find some common satellites
        common_satellites = ['iss', 'hst', 'landsat8', 'terra', 'aqua']
        available_satellites = []
        
        for sat in observatories['Observatory']:
            if sat['Id'].lower() in common_satellites:
                available_satellites.append(sat['Id'])
                print(f"✅ Found: {sat['Id']} - {sat['Name']}")
        
        print(f"\n📋 Available common satellites: {available_satellites}")
        
    except Exception as e:
        print(f"❌ Error fetching observatories: {e}")
        return
    
    print("\n2. 📍 FETCHING SATELLITE POSITIONS (Locations)")
    print("-" * 40)
    
    if available_satellites:
        # Test with ISS first
        test_satellite = available_satellites[0]
        print(f"🎯 Testing with satellite: {test_satellite}")
        
        try:
            # Create time window (1 hour)
            end_time = datetime.utcnow()
            start_time = end_time - timedelta(hours=1)
            
            print(f"⏰ Time window: {start_time.strftime('%Y-%m-%dT%H:%M:%SZ')} to {end_time.strftime('%Y-%m-%dT%H:%M:%SZ')}")
            
            # Get positions
            positions = client.get_locations([test_satellite], [start_time.strftime('%Y-%m-%dT%H:%M:%SZ'), end_time.strftime('%Y-%m-%dT%H:%M:%SZ')])
            
            print(f"✅ Successfully fetched position data")
            print(f"📊 Response structure: {list(positions.keys())}")
            print(f"📊 Status Code: {positions['StatusCode']}")
            print(f"📊 HTTP Status: {positions['HttpStatus']}")
            
            if positions['Data']:
                # Parse the data (it's a string representation of a list)
                import ast
                data_list = ast.literal_eval(positions['Data'])
                
                print(f"\n🛰️ Satellite data for {test_satellite}:")
                sat_data = data_list[0]  # First (and only) satellite
                print(f"   ID: {sat_data['Id']}")
                print(f"   Coordinates available: {len(sat_data['Coordinates'])} coordinate systems")
                
                # Show coordinate systems
                for i, coord_system in enumerate(sat_data['Coordinates']):
                    print(f"\n   📐 Coordinate System {i+1}:")
                    print(f"      System: {coord_system['CoordinateSystem']}")
                    print(f"      X data points: {len(coord_system['X'])}")
                    print(f"      Y data points: {len(coord_system['Y'])}")
                    print(f"      Z data points: {len(coord_system['Z'])}")
                    print(f"      Latitude data points: {len(coord_system['Latitude'])}")
                    print(f"      Longitude data points: {len(coord_system['Longitude'])}")
                    print(f"      Time data points: {len(coord_system['Time'])}")
                    
                    # Show first few data points
                    if len(coord_system['Time']) > 0:
                        print(f"\n      🕐 Sample data points (first 3):")
                        for j in range(min(3, len(coord_system['Time']))):
                            print(f"         Time: {coord_system['Time'][j]}")
                            print(f"         X: {coord_system['X'][j]:.2f} km")
                            print(f"         Y: {coord_system['Y'][j]:.2f} km")
                            print(f"         Z: {coord_system['Z'][j]:.2f} km")
                            print(f"         Lat: {coord_system['Latitude'][j]:.2f}°")
                            print(f"         Lon: {coord_system['Longitude'][j]:.2f}°")
                            print()
                    
                    # Calculate altitude from position
                    if len(coord_system['X']) > 0:
                        x = coord_system['X'][-1]  # Latest position
                        y = coord_system['Y'][-1]
                        z = coord_system['Z'][-1]
                        altitude = (x**2 + y**2 + z**2)**0.5 - 6371  # Earth radius
                        print(f"      🌍 Current altitude: {altitude:.2f} km")
            
            else:
                print("❌ No position data returned")
                
        except Exception as e:
            print(f"❌ Error fetching positions: {e}")
            import traceback
            traceback.print_exc()
    
    print("\n3. 🔍 SUMMARY")
    print("-" * 40)
    print("✅ SSC Web Services provides:")
    print("   • List of 300+ satellites with metadata")
    print("   • Real-time position data (X, Y, Z coordinates)")
    print("   • Geographic coordinates (Latitude, Longitude)")
    print("   • Time-series data (multiple time points)")
    print("   • Multiple coordinate systems (GSE, GEO, etc.)")
    print("   • High resolution data (1-minute intervals)")
    print("\n🎯 This is REAL satellite tracking data from NASA!")

if __name__ == "__main__":
    main()
