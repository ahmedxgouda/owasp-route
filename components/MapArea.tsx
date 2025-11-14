'use client';

import { useState, useEffect } from 'react';
import type { Location } from '@/types/location';
import dynamic from 'next/dynamic';
import type { Item } from '@/types/item';
import type { DataType } from '@/types/data_type';
import { getData } from '@/api/data';
import LoadingSpinner from '@/components/LoadingSpinner';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function MapArea() {
  const [location, setLocation] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [option, setOption] = useState<DataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    if (!location || !option) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setData([]); // Clear previous data
        const items = await getData(option, location.lat, location.lng);
        setData(items);
      } catch {
        setError(`Failed to fetch ${option}.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location, option]);

  return location ? (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex items-center mb-4">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mb-4"
          onClick={() => {
            setOption('chapters');
            setDestination(null);
          }}
        >
          Show Chapters
        </button>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition mb-4 ml-4"
          onClick={() => {
            setOption('events');
            setDestination(null);
          }}
        >
          Show Events
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
      {!data.length && !isLoading && option && (
        <div className="text-gray-600 font-semibold mt-2">No {option} found nearby.</div>
      )}
      <Map
        location={location}
        data={data}
        option={option}
        destination={destination}
        setDestination={setDestination}
      />
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
