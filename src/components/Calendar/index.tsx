import { useSelector } from 'react-redux';
import addDays from 'date-fns/addDays';
import endOfMonth from 'date-fns/endOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import Day from '../Day';
import { selectors } from '../../reducers';
import { CalendarGrid } from './styles';

const isWeekend = (date: Date): boolean =>
  date.getDay() === 0 || date.getDay() === 6;

const isEqual = (dateA: Date, dateB: Date): boolean =>
  format(dateA, 'yyyy-MM-dd') === format(dateB, 'yyyy-MM-dd');

const getPreviousMonthDays = (firstDayOfTheMonth: Date): Array<Date> => {
  const previousMonthDays: Array<Date> = [];
  let date = startOfWeek(firstDayOfTheMonth);

  while (!isEqual(date, firstDayOfTheMonth)) {
    previousMonthDays.push(date);
    date = addDays(date, 1);
  }
  return previousMonthDays;
};

const getNextMonthDays = (endDayOfTheMonth: Date): Array<Date> => {
  const nextMonthDays: Array<Date> = [];
  let date = endOfWeek(endDayOfTheMonth);

  while (!isEqual(date, endDayOfTheMonth)) {
    nextMonthDays.unshift(date);
    date = subDays(date, 1);
  }
  return nextMonthDays;
};

const getDaysOfMonth = (firstDay: Date, lastDay: Date): Array<Date> => {
  const daysOfMonth = [firstDay];
  let date = addDays(firstDay, 1);
  while (!isEqual(date, lastDay)) {
    daysOfMonth.push(date);
    date = addDays(date, 1);
  }
  daysOfMonth.push(lastDay);
  return daysOfMonth;
};

const Calendar = (): JSX.Element => {
  const date = useSelector(selectors.getCurrentDate);
  const firstDayOfTheMonth = startOfMonth(date);
  const endDayOfTheMonth = endOfMonth(date);

  const previousMonthDays = getPreviousMonthDays(firstDayOfTheMonth);
  const daysOfMonth = getDaysOfMonth(firstDayOfTheMonth, endDayOfTheMonth);
  const nextMonthDays = getNextMonthDays(endDayOfTheMonth);

  return (
    <CalendarGrid>
      {previousMonthDays.map((previousMonthDate: Date) => (
        <Day
          key={previousMonthDate.toISOString()}
          day={previousMonthDate.getDate()}
          isWeekend={isWeekend(previousMonthDate)}
        />
      ))}
      {daysOfMonth.map((currentMonthDate: Date) => (
        <Day
          key={currentMonthDate.toISOString()}
          day={currentMonthDate.getDate()}
          isWeekend={isWeekend(currentMonthDate)}
          isCurrentMonth
        />
      ))}
      {nextMonthDays.map((nextMonthDate: Date) => (
        <Day
          key={nextMonthDate.toISOString()}
          day={nextMonthDate.getDate()}
          isWeekend={isWeekend(nextMonthDate)}
        />
      ))}
    </CalendarGrid>
  );
};

export default Calendar;
