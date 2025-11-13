import { getData } from '@/api/data';
import type { Chapter } from '@/types/chapter';

export function getChapters(latitude: number, longitude: number): Promise<Chapter[]> {
  return getData<Chapter>('chapters', latitude, longitude);
}
