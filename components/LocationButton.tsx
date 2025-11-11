'use client';

import { useState } from 'react';
import type { Location } from '@/types/location';

export default function LocationButton() {
    const [location, setLocation] = useState<Location | null>(null);
    const handleEnableLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                alert(`Location enabled: (${position.coords.latitude}, ${position.coords.longitude})`);
            }, 
            () => {
                alert("Error obtaining location. Please ensure location services are enabled.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        (location) ? (<div className="text-green-600 font-semibold">
            Location Enabled: ({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})
        </div>
    ) : (
        <button
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        onClick={handleEnableLocation}
        >
        Enable Location Services
        </button>
    )
  );
}
