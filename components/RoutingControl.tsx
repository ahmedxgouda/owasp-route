'use client';

import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export default function RoutingControl({ waypoints }: { waypoints: L.LatLngExpression[] }) {
  const map = useMap();
  const controlRef = useRef<L.Control | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Routing = (L as any).Routing;
    if ((!Routing || waypoints.length < 2) && controlRef.current) {
      map.removeControl(controlRef.current);
      controlRef.current = null;
      return;
    }

    // create control
    controlRef.current = Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      fitSelectedRoute: true,
      lineOptions: { styles: [{ color: '#1976d2', weight: 5 }] },
      createMarker: () => null,
    }).addTo(map);

    return () => {
      if (controlRef.current) {
        map.removeControl(controlRef.current);
        controlRef.current = null;
      }
    };
  }, [map, waypoints]);

  return null;
}
