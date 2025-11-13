import { getData } from '@/api/data';
import type { Event } from '@/types/event';

export function getEvents(latitude: number, longitude: number): Promise<Event[]> {
  return getData<Event>('events', latitude, longitude);
}
