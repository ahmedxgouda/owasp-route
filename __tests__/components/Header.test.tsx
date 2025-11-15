import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import Header from '@/components/Header';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

const useThemeMock = jest.fn();
jest.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('Header', () => {
  test('renders header after mount with light theme and shows moon button', async () => {
    const setTheme = jest.fn();
    useThemeMock.mockReturnValue({ theme: 'light', setTheme });

    render(<Header />);

    // Wait for the component to mount and render its content
    await waitFor(() => expect(screen.getByText('OWASP Route')).toBeInTheDocument());

    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });

  test('clicking button toggles theme from light to dark via setTheme', async () => {
    const setTheme = jest.fn();
    useThemeMock.mockReturnValue({ theme: 'light', setTheme });

    render(<Header />);

    const btn = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(btn);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  test('renders sun emoji when theme is dark', async () => {
    const setTheme = jest.fn();
    useThemeMock.mockReturnValue({ theme: 'dark', setTheme });

    render(<Header />);

    expect(screen.getByText('☀️')).toBeInTheDocument();
  });
});
