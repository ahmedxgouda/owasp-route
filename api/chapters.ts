import { apiUrl } from '@/api/root';
import { calcCoordinates } from '@/utils/calc_cordinates';

const THRESHOLD_DISTANCE_KM = 300;

export function getChapters(latitude: number, longitude: number) {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = calcCoordinates(
    latitude,
    longitude,
    THRESHOLD_DISTANCE_KM
  );
  return fetch(
    `${apiUrl}/chapters?latitude_lte=${maxLatitude}&latitude_gte=${minLatitude}&longitude_lte=${maxLongitude}&longitude_gte=${minLongitude}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());
}
