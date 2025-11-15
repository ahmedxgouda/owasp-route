import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MapArea from '@/components/MapArea';
import { getData } from '@/api/data';

// Mock child components to keep tests focused on MapArea behavior
jest.mock('@/components/Map', () => () => <div data-testid="map">Mock Map</div>);
jest.mock('@/components/LoadingSpinner', () => () => <div data-testid="spinner">Loading</div>);

// Mock getData from api
jest.mock('@/api/data', () => ({
  getData: jest.fn(),
}));

describe('MapArea', () => {
  const originalGeolocation = global.navigator?.geolocation;

  afterEach(() => {
    jest.resetAllMocks();
    // restore original geolocation
    if (originalGeolocation) {
      Object.defineProperty(global, 'navigator', {
        value: { geolocation: originalGeolocation },
        writable: true,
      });
    }
  });

  test('enables location and fetches chapters, shows loading spinner then map', async () => {
    // Prepare geolocation success callback
    const mockGetCurrentPosition = jest.fn((success) =>
      success({
        coords: { latitude: 12.34, longitude: 56.78 },
      })
    );
    Object.defineProperty(global, 'navigator', {
      value: { geolocation: { getCurrentPosition: mockGetCurrentPosition } },
      writable: true,
    });

    // Control getData resolution
    let resolveGetData: (items) => void;
    (getData as jest.Mock).mockImplementation(
      () =>
        new Promise((res) => {
          resolveGetData = res;
        })
    );

    render(<MapArea />);

    // Initially shows enable prompt
    const enableBtn = screen.getByRole('button', { name: /Enable Location Services/i });
    fireEvent.click(enableBtn);

    // After enabling, click Chapters to trigger fetch
    const chaptersBtn = await screen.findByRole('button', { name: /Chapters/i });
    fireEvent.click(chaptersBtn);

    // getData should have been called (but promise still pending)
    expect(getData).toHaveBeenCalledWith('chapters', 12.34, 56.78, 300);

    // Spinner should be visible while fetching
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Resolve the fetch
    act(() => {
      resolveGetData([{ id: '1', name: 'Test Chapter' }]);
    });

    // Wait for spinner to disappear and Map to appear
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      expect(screen.getByTestId('map')).toBeInTheDocument();
    });
  });

  test('shows error when geolocation retrieval fails', async () => {
    const mockGetCurrentPosition = jest.fn((_, errorCb) => errorCb && errorCb(new Error('Denied')));
    Object.defineProperty(global, 'navigator', {
      value: { geolocation: { getCurrentPosition: mockGetCurrentPosition } },
      writable: true,
    });

    render(<MapArea />);

    const enableBtn = screen.getByRole('button', { name: /Enable Location Services/i });
    fireEvent.click(enableBtn);

    // Error message from MapArea should be shown
    await screen.findByText(/Unable to retrieve your location/i);
    expect(screen.getByText(/Unable to retrieve your location/)).toBeInTheDocument();
  });
});
