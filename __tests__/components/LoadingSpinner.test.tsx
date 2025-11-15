import { render } from '@testing-library/react';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders a div with the expected classes', () => {
    const { container } = render(<LoadingSpinner />);
    const element = container.firstElementChild as HTMLElement | null;
    expect(element).not.toBeNull();
    expect(element!.tagName).toBe('DIV');
    const classes = element!.className.split(/\s+/);
    expect(classes).toEqual(
      expect.arrayContaining([
        'w-12',
        'h-12',
        'border-4',
        'border-t-4',
        'border-blue-500',
        'rounded-full',
        'animate-spin',
      ])
    );
  });

  test('contains animate-spin class specifically', () => {
    const { container } = render(<LoadingSpinner />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.classList.contains('animate-spin')).toBe(true);
  });
});
