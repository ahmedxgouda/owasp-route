import { calcCoordinates } from '@/utils/calc_coordinates';

describe('calcCoordinates', () => {
  it('is exported as a function', () => {
    expect(typeof calcCoordinates).toBe('function');
  });

  it('returns the same coordinates when distance is 0', () => {
    const lat = 10.123456;
    const lon = 20.654321;
    const result = calcCoordinates(lat, lon, 0);
    expect(result).toHaveProperty('minLatitude');
    expect(result).toHaveProperty('minLongitude');

    expect(result).toHaveProperty('maxLatitude');
    expect(result).toHaveProperty('maxLongitude');

    expect(typeof result.minLatitude).toBe('number');
    expect(typeof result.minLongitude).toBe('number');
    expect(typeof result.maxLatitude).toBe('number');
    expect(typeof result.maxLongitude).toBe('number');

    expect(result.maxLatitude).toBeCloseTo(lat, 6);
    expect(result.maxLongitude).toBeCloseTo(lon, 6);
    expect(result.minLatitude).toBeCloseTo(lat, 6);
    expect(result.minLongitude).toBeCloseTo(lon, 6);
  });
});
