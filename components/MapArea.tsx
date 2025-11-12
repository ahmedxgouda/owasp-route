"use client";

import { useState } from "react";
import type { Location } from "@/types/location";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function MapArea() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setError(
            "Unable to retrieve your location. Please check your browser settings.",
          );
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return location ? (
    <Map lat={location.lat} lng={location.lng} />
  ) : (
    <>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        onClick={handleEnableLocation}
      >
        Enable Location Services
      </button>
      {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
    </>
  );
}
