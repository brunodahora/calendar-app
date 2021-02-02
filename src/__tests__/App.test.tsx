import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('date-fns', () => ({ today: jest.fn() }));

describe('Calendar App', () => {
  describe('Given I open the calendar', () => {
    describe('And I am on February, 2021', () => {
      beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2021, 1, 2));
      });

      test('Then I should see the current month and year', () => {
        render(<App />);
        expect(screen.getByText('February, 2021')).toBeInTheDocument();
      });

      test('Then I should see the days of the week', () => {
        render(<App />);
        expect(screen.getByText('Sunday')).toBeInTheDocument();
        expect(screen.getByText('Monday')).toBeInTheDocument();
        expect(screen.getByText('Tuesday')).toBeInTheDocument();
        expect(screen.getByText('Wednesday')).toBeInTheDocument();
        expect(screen.getByText('Thursday')).toBeInTheDocument();
        expect(screen.getByText('Friday')).toBeInTheDocument();
        expect(screen.getByText('Saturday')).toBeInTheDocument();
      });
    });
  });
});
