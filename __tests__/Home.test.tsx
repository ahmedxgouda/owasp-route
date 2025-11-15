import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/MapArea', () => () => <div data-testid="map-area">Map Area</div>);

describe('Home Page', () => {
  test('renders the Home component with MapArea', () => {
    render(<Home />);
    const mapAreaElement = screen.getByTestId('map-area');
    expect(mapAreaElement).toBeInTheDocument();
  });

  test('displays the main heading', () => {
    render(<Home />);
    const headingElement = screen.getByRole('heading', { name: 'Welcome to OWASP Route' });
    expect(headingElement).toBeInTheDocument();
  });

  test('displays the subheading', () => {
    render(<Home />);
    const subheadingElement = screen.getByText(
      'OWASP Route is a tool to help you find and connect with OWASP chapters and events around you.'
    );
    expect(subheadingElement).toBeInTheDocument();
  });
});
