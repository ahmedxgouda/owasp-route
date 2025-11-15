import { apiUrl } from '@/api/root';
import { calcCoordinates } from '@/utils/calc_coordinates';
import type { Item } from '@/types/item';
import type { DataType } from '@/types/data_type';

export function getData(
  type: DataType,
  latitude: number,
  longitude: number,
  threshold: number
): Promise<Item[]> {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = calcCoordinates(
    latitude,
    longitude,
    threshold
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
