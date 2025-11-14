'use client';

import { Dispatch, SetStateAction } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Location } from '@/types/location';
import type { Item } from '@/types/item';
import type { DataType } from '@/types/data_type';
import RoutingControl from '@/components/RoutingControl';
import DateComponent from '@/components/DateComponent';

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
  option,
  destination,
  setDestination,
}: {
  location: Location | null;
  data: Item[];
  option: DataType | null;
  destination: Location | null;
  setDestination: Dispatch<SetStateAction<Location | null>>;
}) {
  const waypoints: L.LatLngExpression[] = [];
  if (location) waypoints.push(location as L.LatLngExpression);
  if (destination) waypoints.push(destination as L.LatLngExpression);

  return (
    <div className="w-full">
      <MapContainer
        center={location ?? { lat: 0, lng: 0 }}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: '600px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && (
          <Marker position={location}>
            <Popup>
              <div className="text-center">
                <strong className="text-lg">📍 You are here</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {data.map((item: Item) => (
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
              <div className="min-w-[200px]">
                <strong className="text-lg block mb-2">{item.name}</strong>
                {item.start_date && (
                  <p className="text-sm mb-1">
                    🗓️ <strong>Start:</strong> <DateComponent dateString={item.start_date} />
                  </p>
                )}
                {item.end_date && (
                  <p className="text-sm mb-2">
                    🏁 <strong>End:</strong> <DateComponent dateString={item.end_date} />
                  </p>
                )}
                {item.url && (
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    🔗 More info
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        {data.length > 0 && <RoutingControl waypoints={waypoints} option={option} />}
      </MapContainer>

      <div className="flex items-center justify-center mt-6">
        {destination ? (
          <button className="btn btn-danger" onClick={() => setDestination(null)}>
            ✖️ Clear Route
          </button>
        ) : (
          <div className="card text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              👆 Click any marker to route to it
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
