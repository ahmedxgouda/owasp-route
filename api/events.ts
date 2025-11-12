import { apiUrl } from '@/api/root';
import { calcCoordinates } from '@/utils/calc_cordinates';

const THRESHOLD_DISTANCE_KM = 50;

export function getEvents(latitude: number, longitude: number) {
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
  ).then((res) => res.json());
}
