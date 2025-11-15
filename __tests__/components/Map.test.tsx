import { render, screen, fireEvent } from '@testing-library/react';
import Map from '@/components/Map';

jest.mock('leaflet', () => ({
  Icon: {
    Default: {
      mergeOptions: jest.fn(),
    },
  },
}));

jest.mock('react-leaflet', () => {
  return {
    MapContainer: ({ children, center }) => (
      <div data-testid="map-container" data-center={JSON.stringify(center)}>
        {children}
      </div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children, position, eventHandlers }) => (
      <div
        data-testid={`marker-${position.lat}-${position.lng}`}
        data-lat={position.lat}
        data-lng={position.lng}
        onClick={() => eventHandlers?.click?.()}
      >
        {children}
      </div>
    ),
    Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  };
});

jest.mock('@/components/RoutingControl', () => {
  return () => <div data-testid="routing-control">Routing Control</div>;
});

jest.mock('@/components/DateComponent', () => {
  return ({ dateString }) => <span data-testid="date-component">{dateString}</span>;
});

jest.mock('next/link', () => {
  return ({ children, href, ...props }) => (
    <a data-testid="next-link" href={href} {...props}>
      {children}
    </a>
  );
});

describe('Map component', () => {
  const sampleItem = {
    key: '1',
    name: 'Sample Place',
    latitude: 10,
    longitude: 20,
    start_date: '2023-01-01',
    end_date: '2023-01-05',
    url: 'https://example.com',
  };

  test('renders MapContainer with provided center when location is given', () => {
    const location = { lat: 1, lng: 2 };
    render(
      <Map
        location={location}
        data={[]}
        option={null}
        destination={null}
        setDestination={jest.fn()}
      />
    );

    const map = screen.getByTestId('map-container');
    expect(map).toBeInTheDocument();
    expect(map.getAttribute('data-center')).toBe(JSON.stringify(location));
  });

  test('shows user location marker popup when location is provided', () => {
    const location = { lat: 5, lng: 6 };
    render(
      <Map
        location={location}
        data={[]}
        option={null}
        destination={null}
        setDestination={jest.fn()}
      />
    );

    // Popup content for user location contains "You are here"
    expect(screen.getByText(/You are here/i)).toBeInTheDocument();
  });

  test('renders data markers and clicking a marker calls setDestination with coordinates; popup shows details', () => {
    const setDestination = jest.fn();
    render(
      <Map
        location={{ lat: 0, lng: 0 }}
        data={[sampleItem]}
        option="chapters"
        destination={null}
        setDestination={setDestination}
      />
    );

    // Marker exists
    const marker = screen.getByTestId(`marker-${sampleItem.latitude}-${sampleItem.longitude}`);
    expect(marker).toBeInTheDocument();
    expect(marker.getAttribute('data-lat')).toBe(String(sampleItem.latitude));
    expect(marker.getAttribute('data-lng')).toBe(String(sampleItem.longitude));

    // Clicking marker should call setDestination with the item's coords
    fireEvent.click(marker);
    expect(setDestination).toHaveBeenCalledWith({
      lat: sampleItem.latitude,
      lng: sampleItem.longitude,
    });

    // Popup should render item name and DateComponent outputs and link
    expect(screen.getByText(sampleItem.name)).toBeInTheDocument();
    expect(screen.getByTestId('next-link')).toHaveAttribute('href', sampleItem.url);

    // RoutingControl should be rendered because data.length > 0
    expect(screen.getByTestId('routing-control')).toBeInTheDocument();
  });

  test('shows Clear Route button when destination is set and clicking it clears the destination', () => {
    const setDestination = jest.fn();
    const destination = { lat: 9, lng: 9 };
    render(
      <Map
        location={{ lat: 0, lng: 0 }}
        data={[]}
        option={null}
        destination={destination}
        setDestination={setDestination}
      />
    );

    const clearButton = screen.getByRole('button', { name: /Clear Route/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(setDestination).toHaveBeenCalledWith(null);
  });
});
