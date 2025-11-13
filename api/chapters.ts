import { apiUrl } from '@/api/root';
import { calcCoordinates } from '@/utils/calc_cordinates';
import type { Chapter } from '@/types/chapter';

const THRESHOLD_DISTANCE_KM = 300;

export function getChapters(latitude: number, longitude: number): Promise<Chapter[]> {
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
  ).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch chapters');
    }
    return res.json().then((data) => data.items);
  });
}
