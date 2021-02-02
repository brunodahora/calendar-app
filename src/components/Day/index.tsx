import { DayContainer, DayHeader, DayNumber } from './styles';

type Props = {
  day: number;
  isWeekend: boolean;
  isCurrentMonth?: boolean;
};

const Day = ({
  day,
  isWeekend,
  isCurrentMonth = false,
}: Props): JSX.Element => (
  <DayContainer isWeekend={isWeekend}>
    <DayHeader>
      <DayNumber isWeekend={isWeekend} isCurrentMonth={isCurrentMonth}>
        {day}
      </DayNumber>
    </DayHeader>
  </DayContainer>
);

export default Day;
