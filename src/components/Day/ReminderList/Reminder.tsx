import styled from 'styled-components';
import { ReminderType } from '../../../reducers';

type Props = ReminderType & { index: number };

type ColorProps = { color: string };

const ReminderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 20px;
`;

const Color = styled.div<ColorProps>`
  background-color: ${({ color }) => color};
  border-radius: 50%;
  height: 12px;
  width: 12px;
  margin-right: 8px;
`;

const Time = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const Description = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const getTimeString = (time: number): string =>
  `${time.toString().substring(0, 2)}:${time.toString().substring(2)}`;

const Reminder = ({ color, time, description, index }: Props): JSX.Element => {
  return (
    <ReminderContainer>
      <Color data-testid="reminder-color" color={color} />
      <Time>{getTimeString(time)}</Time>
      <Description>{description}</Description>
    </ReminderContainer>
  );
};
export default Reminder;
