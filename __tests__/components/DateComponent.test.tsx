import { render, screen } from '@testing-library/react';
import DateComponent from '@/components/DateComponent';

describe('DateComponent', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders a <time> with the provided dateString as dateTime and formatted text', () => {
    const dateString = '2021-03-14T00:00:00Z';
    const formatted = 'March 14, 2021';
    jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue(formatted);

    render(<DateComponent dateString={dateString} />);

    const timeEl = screen.getByText(formatted);
    expect(timeEl.getAttribute('dateTime')).toBe(dateString);
  });

  test('calls toLocaleDateString with the expected locale and options', () => {
    const dateString = '2022-12-25';
    const spy = jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue('Dec 25, 2022');

    render(<DateComponent dateString={dateString} />);

    expect(spy).toHaveBeenCalledWith(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });
});
