import { apiUrl } from '@/api/root';
import { calcCoordinates } from '@/utils/calc_cordinates';
import type { Chapter } from '@/types/chapter';
import type { Event } from '@/types/event';
import type { DataType } from '@/types/data_type';

const THRESHOLD_DISTANCE_KM = 300;

export function getData<T extends Chapter | Event>(
  type: DataType,
  latitude: number,
  longitude: number
): Promise<T[]> {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = calcCoordinates(
    latitude,
    longitude,
    THRESHOLD_DISTANCE_KM
  );

  const queryParams = new URLSearchParams({
    latitude_lte: maxLatitude.toString(),
    latitude_gte: minLatitude.toString(),
    longitude_lte: maxLongitude.toString(),
    longitude_gte: minLongitude.toString(),
  });

  // Add upcoming=True only for events
  if (type === 'events') {
    queryParams.append('upcoming', 'True');
  }

  return fetch(`${apiUrl}/${type}?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch ${type}`);
    }
    return res.json().then((data) => data.items);
  });
}
