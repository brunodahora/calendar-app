import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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

      test('Then I should see the complete calendar', () => {
        const { container } = render(<App />);
        expect(container.firstChild).toMatchSnapshot();
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

      describe('When I click in the previous month button', () => {
        beforeEach(() => {
          userEvent.click(screen.getByRole('button', { name: /previous/i }));
        });

        test('Then I should see the month of january', () => {
          expect(screen.getByText('January, 2021')).toBeInTheDocument();
          expect(screen.queryAllByText('27')).toHaveLength(2);
          expect(screen.getByText('10')).toBeInTheDocument();
          expect(screen.queryAllByText('6')).toHaveLength(2);
        });
      });

      describe('When I click in the next month button until March', () => {
        beforeEach(() => {
          userEvent.click(screen.getByRole('button', { name: /next/i }));
          userEvent.click(screen.getByRole('button', { name: /next/i }));
        });

        test('Then I should see the month of march', () => {
          expect(screen.getByText('March, 2021')).toBeInTheDocument();
          expect(screen.queryAllByText('28')).toHaveLength(2);
          expect(screen.getByText('10')).toBeInTheDocument();
          expect(screen.queryAllByText('2')).toHaveLength(2);
        });
      });

      describe('When I click in the add reminder button at March, 12th', () => {
        beforeEach(() => {
          userEvent.click(
            within(
              screen.getByTestId(new Date(2021, 2, 12).toISOString())
            ).getByRole('button', { name: /add reminder/i })
          );
        });

        test('Then I should see a dropdown with the information to set the reminder', () => {
          expect(screen.getByText('Add Reminder')).toBeInTheDocument();
          expect(
            screen.getByRole('textbox', { name: /description/i })
          ).toBeInTheDocument();
          expect(
            screen.getByRole('textbox', { name: /time/i })
          ).toBeInTheDocument();
          expect(
            screen.getByRole('textbox', { name: /city/i })
          ).toBeInTheDocument();
          expect(
            screen.getByRole('textbox', { name: /color/i })
          ).toBeInTheDocument();
        });

        test('Then I should see the save button disabled', () => {
          expect(
            screen.getByRole('button', { name: /save/i })
          ).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
        });

        describe('When I fill all data with wrong time', () => {
          beforeEach(() => {
            userEvent.type(
              screen.getByRole('textbox', { name: /description/i }),
              'Remind me of something'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /time/i }),
              '20000'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /city/i }),
              'Curitiba'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /color/i }),
              '#000000'
            );
          });

          test('When I click in save, Then I should see an alert with an error about time', () => {
            jest.spyOn(window, 'alert');
            userEvent.click(screen.getByRole('button', { name: /save/i }));
            expect(window.alert).toHaveBeenCalledWith(
              '\nTime must be of format HH:mm'
            );
          });
        });

        describe('When I fill all data with wrong color', () => {
          beforeEach(() => {
            userEvent.type(
              screen.getByRole('textbox', { name: /description/i }),
              'Remind me of something'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /time/i }),
              '2000'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /city/i }),
              'Curitiba'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /color/i }),
              '000'
            );
          });

          test('When I click in save, Then I should see an alert with an error about time', () => {
            jest.spyOn(window, 'alert');
            userEvent.click(screen.getByRole('button', { name: /save/i }));
            expect(window.alert).toHaveBeenCalledWith(
              '\nColor must be a valid Hex value'
            );
          });
        });

        describe('When I fill all data with correct information', () => {
          beforeEach(() => {
            userEvent.type(
              screen.getByRole('textbox', { name: /description/i }),
              'Remind me of something'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /time/i }),
              '2000'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /city/i }),
              'Curitiba'
            );
            userEvent.type(
              screen.getByRole('textbox', { name: /color/i }),
              '#000000'
            );
          });

          test('When I click in save, Then I should see the reminder in the correct date', () => {
            jest.spyOn(window, 'alert');
            userEvent.click(screen.getByRole('button', { name: /save/i }));
            expect(window.alert).toHaveBeenCalledWith('Reminder created');
            expect(
              within(
                screen.getByTestId(new Date(2021, 2, 12).toISOString())
              ).getByText('20:00')
            ).toBeInTheDocument();
            expect(
              within(
                screen.getByTestId(new Date(2021, 2, 12).toISOString())
              ).getByText('Remind me of something')
            ).toBeInTheDocument();
            expect(
              within(
                screen.getByTestId(new Date(2021, 2, 12).toISOString())
              ).getByTestId('reminder-color')
            ).toHaveStyle({ 'background-color': '#000000' });
          });
        });
      });
    });
  });
});
