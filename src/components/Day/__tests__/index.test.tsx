/* eslint-disable @typescript-eslint/ban-ts-comment */
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../test-utils';
import Day from '../index';

describe('<Day />', () => {
  describe('Given I am on 12/02/2021', () => {
    beforeAll(() => {
      jest.spyOn(window, 'alert');
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(2021, 1, 2));
    });

    beforeEach(() => {
      const date = new Date(2021, 1, 2);
      render(
        <Day
          id={date.toISOString()}
          key={date.toISOString()}
          day={date.getDate()}
          isCurrentMonth
        />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('When I click in the add reminder button', () => {
      beforeEach(async () => {
        userEvent.click(screen.getByRole('button', { name: /add reminder/i }));
        await waitFor(() => screen.getByText('Add Reminder'));
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

      describe('And I fill all data with wrong time', () => {
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

        describe('And I click in save', () => {
          beforeEach(() => {
            userEvent.click(screen.getByRole('button', { name: /save/i }));
          });

          test('Then I should see an alert with an error about time', () => {
            expect(window.alert).toHaveBeenCalledWith(
              '\nTime must be of format HH:mm'
            );
          });
        });
      });

      describe('And I fill all data with wrong color', () => {
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

        describe('And I click in save', () => {
          beforeEach(() => {
            userEvent.click(screen.getByRole('button', { name: /save/i }));
          });

          test('Then I should see an alert with an error about time', () => {
            expect(window.alert).toHaveBeenCalledWith(
              '\nColor must be a valid Hex value'
            );
          });
        });
      });

      describe('And I fill all data with correct information', () => {
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

        describe('And I click in save', () => {
          beforeEach(() => {
            userEvent.click(screen.getByRole('button', { name: /save/i }));
          });

          test('Then I should see the reminder in the correct date', () => {
            expect(window.alert).toHaveBeenCalledWith('Reminder created');
            expect(screen.getByText('20:00')).toBeInTheDocument();
            expect(
              screen.getByText('Remind me of something')
            ).toBeInTheDocument();
            expect(screen.getByTestId('reminder-color')).toHaveStyle({
              'background-color': '#000000',
            });
          });

          describe('And I click in the delete all reminders button', () => {
            beforeEach(() => {
              userEvent.click(
                screen.getByRole('button', { name: /delete all reminder/i })
              );
            });

            test('Then I should not see any reminder in this day', () => {
              expect(
                screen.queryByTestId('reminder-color')
              ).not.toBeInTheDocument();
              expect(window.alert).toHaveBeenCalledWith(
                'All reminders deleted'
              );
            });
          });

          describe('And I click in the created reminder and the Weather API returns ok', () => {
            beforeEach(() => {
              jest.clearAllMocks();
              const mockedFetch = jest.spyOn(window, 'fetch');
              // @ts-ignore
              mockedFetch.mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue({
                  weather: [
                    {
                      id: 803,
                      main: 'Clouds',
                      description: 'broken clouds',
                      icon: '04n',
                    },
                  ],
                }),
              });

              userEvent.click(screen.getByText('Remind me of something'));
            });

            test('Then I should see a dropdown with the reminder information', () => {
              expect(screen.getByText('Edit Reminder')).toBeInTheDocument();
              expect(
                screen.getByRole('textbox', {
                  name: /description/i,
                })
              ).toHaveValue('Remind me of something');
              expect(
                screen.getByRole('textbox', {
                  name: /time/i,
                })
              ).toHaveValue('20:00');
              expect(
                screen.getByRole('textbox', {
                  name: /city/i,
                })
              ).toHaveValue('Curitiba');
              expect(
                screen.getByRole('textbox', {
                  name: /color/i,
                })
              ).toHaveValue('#000000');
            });

            test('Then I should see the weather information for the city', async () => {
              expect(await screen.findByText(/clouds/i)).toBeInTheDocument();
            });

            describe('And I click in delete', () => {
              beforeEach(() => {
                userEvent.click(
                  screen.getByRole('button', { name: /^delete$/i })
                );
              });

              test('Then I should not see the reminder anymore', () => {
                expect(window.alert).toHaveBeenCalledWith('Reminder deleted');
                expect(
                  screen.queryByText('Remind me of something')
                ).not.toBeInTheDocument();
              });
            });

            describe('And I update the description and save', () => {
              beforeEach(() => {
                userEvent.type(
                  screen.getByRole('textbox', { name: /description/i }),
                  ' edited'
                );
                userEvent.click(screen.getByRole('button', { name: /save/i }));
              });

              test('Then I should see the reminder with the updated value', () => {
                expect(window.alert).toHaveBeenCalledWith('Reminder edited');
                expect(
                  screen.getByText('Remind me of something edited')
                ).toBeInTheDocument();
              });
            });
          });
        });
      });
    });
  });
});
