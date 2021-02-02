import format from 'date-fns/format';
import { MonthYearContainer } from './styles';

const MonthYear = (): JSX.Element => {
  const date = new Date();

  return (
    <MonthYearContainer>
      <h1>{format(date, 'MMMM, yyyy')}</h1>
    </MonthYearContainer>
  );
};

export default MonthYear;
