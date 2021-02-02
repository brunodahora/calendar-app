import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('date-fns', () => ({ today: jest.fn() }));

describe('Calendar App', () => {
  describe('Given I open the calendar', () => {
    describe('And I am on February, 2021', () => {
      beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2021, 2, 2));
      });

      test('Then I should see the current month and year', () => {
        render(<App />);
        expect(screen.getByText('February')).toBeInTheDocument();
        expect(screen.getByText('2021')).toBeInTheDocument();
      });
    });
  });
});
