import { apiUrl } from '@/api/root';
import { calcCoordinates } from '@/utils/calc_cordinates';
import type { Event } from '@/types/event';

const THRESHOLD_DISTANCE_KM = 300;

export function getEvents(latitude: number, longitude: number): Promise<Event[]> {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = calcCoordinates(
    latitude,
    longitude,
    THRESHOLD_DISTANCE_KM
  );

  return fetch(
    `${apiUrl}/events?latitude_lte=${maxLatitude}&latitude_gte=${minLatitude}&longitude_lte=${maxLongitude}&longitude_gte=${minLongitude}&upcoming=True`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch chapters');
    }
    return res.json().then((data) => data.items);
  });
}
