import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import styled from 'styled-components';
import { ReactComponent as NavigateBefore } from '../../assets/navigate_before.svg';
import { ReactComponent as NavigateNext } from '../../assets/navigate_next.svg';
import { actions, selectors } from '../../reducers';

const MonthYearContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const MonthYear = (): JSX.Element => {
  const dispatch = useDispatch();
  const date = useSelector(selectors.getCurrentDate);

  const {
    currentDate: { previousMonth },
  } = actions;

  const goToPreviousMonth = () => dispatch(previousMonth());
  const goToNextMonth = () => console.log('next');

  return (
    <MonthYearContainer>
      <ArrowButton title="Previous Month" onClick={goToPreviousMonth}>
        <NavigateBefore />
      </ArrowButton>
      <h1>{format(date, 'MMMM, yyyy')}</h1>
      <ArrowButton title="Next Month" onClick={goToNextMonth}>
        <NavigateNext />
      </ArrowButton>
    </MonthYearContainer>
  );
};

export default MonthYear;
