import format from 'date-fns/format';
import styled from 'styled-components';

const MonthYearContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;

const MonthYear = (): JSX.Element => {
  const date = new Date();

  return (
    <MonthYearContainer>
      <h1>{format(date, 'MMMM, yyyy')}</h1>
    </MonthYearContainer>
  );
};

export default MonthYear;
