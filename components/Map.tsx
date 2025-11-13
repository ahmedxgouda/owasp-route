'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Location } from '@/types/location';
import type { Event } from '@/types/event';
import type { Chapter } from '@/types/chapter';
import RoutingControl from '@/components/RoutingControl';

import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map({
  location,
  data,
}: {
  location: Location | null;
  data: Chapter[] | Event[];
}) {
  const [destination, setDestination] = useState<Location | null>(null);

  const waypoints: L.LatLngExpression[] = [];
  if (location) waypoints.push(location as L.LatLngExpression);
  if (destination) waypoints.push(destination as L.LatLngExpression);

  return (
    <>
      <MapContainer
        center={location ?? { lat: 0, lng: 0 }}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: '500px', width: '100%', maxWidth: '800px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && (
          <Marker position={location}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {data.map((item: Chapter | Event) => (
          <Marker
            key={item.key}
            position={{ lat: item.latitude, lng: item.longitude }}
            eventHandlers={{
              click: () => {
                setDestination({ lat: item.latitude, lng: item.longitude });
              },
            }}
          >
            <Popup>
              <strong>{item.name}</strong>
              <br />
              {item.url && (
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  More info
                </Link>
              )}
            </Popup>
          </Marker>
        ))}

        {/* Add routing control when we have at least origin and destination */}
        <RoutingControl waypoints={waypoints} />
      </MapContainer>

      <div className="flex items-center justify-center mt-3">
        {destination ? (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={() => setDestination(null)}
          >
            Clear route
          </button>
        ) : (
          <div className="text-sm text-gray-600">Click a marker to route to it.</div>
        )}
      </div>
    </>
  );
}
