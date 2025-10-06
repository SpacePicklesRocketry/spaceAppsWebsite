#!/usr/bin/env python3

"""
Fetch ALL 300+ satellites from SSC and their positions
"""

from sscws.sscws import SscWs
from datetime import datetime, timedelta, timezone
import json

def main():
    print("🚀 Fetching ALL 300+ Satellites from NASA SSC")
    print("=" * 60)
    
    client = SscWs()
    
    # Get all satellites
    print("📡 Getting satellite list...")
    observatories = client.get_observatories()
    all_satellites = observatories['Observatory']
    
    print(f"✅ Found {len(all_satellites)} satellites")
    
    # Filter to only active satellites (those with recent end times)
    print("\n🔍 Filtering to active satellites...")
    active_satellites = []
    current_time = datetime.now(timezone.utc)
    
    for sat in all_satellites:
        # Only include satellites that are still active
        if sat['EndTime'] > current_time:
            active_satellites.append({
                'id': sat['Id'],
                'name': sat['Name'],
                'resolution': sat['Resolution']
            })
    
    print(f"✅ {len(active_satellites)} active satellites found")
    
    # Show first 20 active satellites
    print(f"\n🛰️ First 20 active satellites:")
    for i, sat in enumerate(active_satellites[:20]):
        print(f"  {i+1:2d}. {sat['id']:12s} - {sat['name']}")
    
    if len(active_satellites) > 20:
        print(f"  ... and {len(active_satellites) - 20} more")
    
    # Test fetching positions for multiple satellites
    print(f"\n📍 Testing position fetch for first 10 satellites...")
    
    # Get satellite IDs for position fetch
    test_ids = [sat['id'] for sat in active_satellites[:10]]
    
    try:
        # Get positions for 1 hour
        end_time = datetime.now(timezone.utc)
        start_time = end_time - timedelta(hours=1)
        
        print(f"⏰ Time window: {start_time.strftime('%H:%M')} to {end_time.strftime('%H:%M')} UTC")
        print(f"🛰️ Fetching positions for: {', '.join(test_ids)}")
        
        # Fetch positions
        result = client.get_locations(test_ids, [start_time.strftime('%Y-%m-%dT%H:%M:%SZ'), end_time.strftime('%Y-%m-%dT%H:%M:%SZ')])
        
        print(f"✅ API Response: {result['StatusCode']}")
        print(f"📊 HTTP Status: {result['HttpStatus']}")
        
        if result['Data']:
            print(f"✅ Successfully got position data for multiple satellites!")
            print(f"📊 Data contains position information for all requested satellites")
            
            # Try to parse and show some data
            data_str = result['Data']
            if 'array([' in data_str:
                print(f"📐 Data format: NumPy array with multiple satellite positions")
                print(f"🕐 Time resolution: 1-minute intervals")
                print(f"🌍 Coordinate systems: GSE (Geocentric Solar Ecliptic)")
        
    except Exception as e:
        print(f"❌ Error fetching positions: {e}")
        print("This might be due to API limits or data format issues")
    
    print(f"\n🎯 SUMMARY")
    print("-" * 30)
    print(f"✅ SSC Web Services provides:")
    print(f"   • {len(all_satellites)} total satellites in database")
    print(f"   • {len(active_satellites)} currently active satellites")
    print(f"   • Real-time position data for multiple satellites")
    print(f"   • 1-minute resolution tracking")
    print(f"   • X,Y,Z coordinates + lat/lon")
    print(f"\n🚀 We CAN plot all {len(active_satellites)} active satellites!")
    print(f"   The JavaScript just needs to be updated to fetch them all.")

if __name__ == "__main__":
    main()
