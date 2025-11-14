'use client';

import { useState, useEffect } from 'react';
import type { Location } from '@/types/location';
import dynamic from 'next/dynamic';
import type { Item } from '@/types/item';
import { getData } from '@/api/data';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function MapArea() {
  const [location, setLocation] = useState<Location | null>(null);
  const [option, setOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Item[]>([]);
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
          setError('Unable to retrieve your location. Please check your browser settings.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (location && option) {
      if (option === 'chapters') {
        getData('chapters', location.lat, location.lng)
          .then((chapters) => {
            setData(chapters);
          })
          .catch(() => {
            setError('Failed to fetch chapters.');
          });
      } else if (option === 'events') {
        getData('events', location.lat, location.lng)
          .then((events) => {
            setData(events);
          })
          .catch(() => {
            setError('Failed to fetch events.');
          });
      }
    }
  }, [location, option]);

  return location ? (
    <div className="flex flex-col w-full items-center">
      <div className="flex items-center mb-4">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mb-4"
          onClick={() => setOption('chapters')}
        >
          Show Chapters
        </button>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition mb-4 ml-4"
          onClick={() => setOption('events')}
        >
          Show Events
        </button>
      </div>
      {!data.length && option && (
        <div className="text-gray-600 font-semibold mt-2">No {option} found nearby.</div>
      )}
      <Map location={location} data={data} />
    </div>
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
