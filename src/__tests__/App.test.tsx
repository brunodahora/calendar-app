import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('date-fns', () => ({ today: jest.fn() }));

describe('Calendar App', () => {
  describe('Given I open the calendar', () => {
    describe('And I am on February, 2021', () => {
      beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2021, 1, 2));
      });

      beforeEach(() => {
        render(<App />);
      });

      test('Then I should see the current month and year', () => {
        expect(screen.getByText('February, 2021')).toBeInTheDocument();
      });

      test('Then I should see the days of the week', () => {
        expect(screen.getByText('Sunday')).toBeInTheDocument();
        expect(screen.getByText('Monday')).toBeInTheDocument();
        expect(screen.getByText('Tuesday')).toBeInTheDocument();
        expect(screen.getByText('Wednesday')).toBeInTheDocument();
        expect(screen.getByText('Thursday')).toBeInTheDocument();
        expect(screen.getByText('Friday')).toBeInTheDocument();
        expect(screen.getByText('Saturday')).toBeInTheDocument();
      });

      test('Then I should see all days from february and the completing days from previous and next months', () => {
        expect(screen.getByText('31')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.queryAllByText('6')).toHaveLength(2);
      });

      test('Then I should see the complete calendar', () => {
        const { container } = render(<App />);
        expect(container.firstChild).toMatchSnapshot();
      });

      describe('When I click in the previous month button', () => {
        beforeEach(() => {
          fireEvent.click(screen.getByAltText('Previous Month'));
        });

        test('Then I should see the current month and year', () => {
          expect(screen.getByText('January, 2021')).toBeInTheDocument();
        });

        test('Then I should see all days from january and the completing days from previous and next months', () => {
          render(<App />);
          expect(screen.queryAllByText('27')).toHaveLength(2);
          expect(screen.getByText('10')).toBeInTheDocument();
          expect(screen.queryAllByText('6')).toHaveLength(2);
        });
      });
    });
  });
});
