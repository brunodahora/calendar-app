import styled from 'styled-components';

type DayNumberProps = {
  isWeekend?: boolean;
  isCurrentMonth?: boolean;
};

const getDayColor = ({ isWeekend, isCurrentMonth }: DayNumberProps): string => {
  if (!isCurrentMonth) return '#666666';
  if (isWeekend) return 'navy';
  return 'black';
};

const getDayBackgroundColor = (isWeekend?: boolean): string => {
  if (isWeekend) return '#E6E6E6';
  return 'white';
};

export const DayContainer = styled.div<{ isWeekend?: boolean }>`
  background-color: ${({ isWeekend }) => getDayBackgroundColor(isWeekend)};
  border: 8px solid ${({ isWeekend }) => getDayBackgroundColor(isWeekend)};
  display: flex;
  flex-direction: column;
`;

export const DayHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DayFillSpace = styled.div`
  flex: 1;
`;

export const IconButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  :active {
    background-color: steelblue;
  }
`;

export const DayNumber = styled.span<DayNumberProps>`
  color: ${(props) => getDayColor(props)};
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
`;
