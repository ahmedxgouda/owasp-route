import type { Coordinates } from "@/types/coordinates";

export function calcCoordinates(
  latitude: number,
  longitude: number,
  thresholdKm: number,
): Coordinates {
  const earthRadiusKm = 6371;

  const latDelta = (thresholdKm / earthRadiusKm) * (180 / Math.PI);
  const lngDelta =
    ((thresholdKm / earthRadiusKm) * (180 / Math.PI)) /
    Math.cos((latitude * Math.PI) / 180);

  return {
    minLatitude: latitude - latDelta,
    maxLatitude: latitude + latDelta,
    minLongitude: longitude - lngDelta,
    maxLongitude: longitude + lngDelta,
  };
}
