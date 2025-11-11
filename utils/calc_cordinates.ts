export function calcCoordinates(
  latitude: number,
  longitude: number,
  thresholdKm: number
): { minLat: number; maxLat: number; minLng: number; maxLng: number } {
  const earthRadiusKm = 6371;

  const latDelta = (thresholdKm / earthRadiusKm) * (180 / Math.PI);
  const lngDelta = (thresholdKm / earthRadiusKm) * (180 / Math.PI) / Math.cos((latitude * Math.PI) / 180);


  return {
    minLat: latitude - latDelta,
    maxLat: latitude + latDelta,
    minLng: longitude - lngDelta,
    maxLng: longitude + lngDelta,
  };
}
