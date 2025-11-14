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
        setData([]);
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
    <div className="flex flex-col w-full items-center justify-center max-w-6xl animate-fade-in">
      <div className="flex gap-4 mb-6">
        <button
          className={`btn ${option === 'chapters' ? 'btn-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => {
            setOption('chapters');
            setDestination(null);
          }}
        >
          📚 Chapters
        </button>
        <button
          className={`btn ${option === 'events' ? 'btn-secondary' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => {
            setOption('events');
            setDestination(null);
          }}
        >
          🎉 Events
        </button>
      </div>

      {error && (
        <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 mb-4 animate-scale-in">
          ⚠️ {error}
        </div>
      )}

      {isLoading && (
        <div className="mb-6">
          <LoadingSpinner />
        </div>
      )}

      {!data.length && !isLoading && option && (
        <div className="card text-center mb-4 animate-scale-in">
          <p className="text-gray-600 dark:text-gray-400">
            No {option} found nearby within 300km radius.
          </p>
        </div>
      )}

      <div className="w-full animate-scale-in">
        <Map
          location={location}
          data={data}
          option={option}
          destination={destination}
          setDestination={setDestination}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div className="card text-center mb-6 max-w-md">
        <h2 className="text-2xl font-bold mb-4">📍 Get Started</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enable location services to discover OWASP chapters and events near you.
        </p>
        <button className="btn btn-primary w-full" onClick={handleEnableLocation}>
          🌍 Enable Location Services
        </button>
      </div>
      {error && (
        <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 max-w-md animate-scale-in">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
