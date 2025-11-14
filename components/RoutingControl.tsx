'use client';

import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import type { DataType } from '@/types/data_type';

export default function RoutingControl({
  waypoints,
  option,
}: {
  waypoints: L.LatLngExpression[];
  option: DataType | null;
}) {
  const map = useMap();
  const controlRef = useRef<L.Control | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Routing = (L as any).Routing;
    // Clean up existing control first
    if (controlRef.current) {
      try {
        const control = controlRef.current;
        // Remove the control's layer from the map
        control.remove();
        controlRef.current = null;
      } catch (e) {
        console.error('Error removing routing control:', e);
      }
    }

    // Only create new control if we have valid waypoints and Routing is available
    if (!Routing || waypoints.length < 2) {
      return;
    }

    try {
      controlRef.current = Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        showAlternatives: false,
        addWaypoints: false,
        fitSelectedRoute: true,
        lineOptions: { styles: [{ color: '#1976d2', weight: 5 }] },
        createMarker: () => null,
      }).addTo(map);
    } catch (e) {
      console.error('Error creating routing control:', e);
    }

    return () => {
      if (controlRef.current) {
        try {
          const control = controlRef.current;
          // Remove the control's layer from the map
          control.remove();
          controlRef.current = null;
        } catch (e) {
          // Silently ignore cleanup errors
          console.warn('Cleanup error (safe to ignore):', e);
        }
      }
    };
  }, [map, waypoints, option]);

  return null;
}
