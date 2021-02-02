import styled from 'styled-components';

type DayNumberProps = {
  isWeekend: boolean;
  isCurrentMonth: boolean;
};

const getDayColor = ({ isWeekend, isCurrentMonth }: DayNumberProps): string => {
  if (!isCurrentMonth) return '#666666';
  if (isWeekend) return 'navy';
  return 'black';
};

const getDayBackgroundColor = (isWeekend: boolean): string => {
  if (isWeekend) return '#E6E6E6';
  return 'white';
};

export const DayContainer = styled.div<{ isWeekend: boolean }>`
  background-color: ${({ isWeekend }) => getDayBackgroundColor(isWeekend)};
  border: 8px solid ${({ isWeekend }) => getDayBackgroundColor(isWeekend)};
  display: flex;
`;

export const DayHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DayNumber = styled.span<DayNumberProps>`
  color: ${(props) => getDayColor(props)};
  font-size: 14px;
  font-weight: bold;
`;
