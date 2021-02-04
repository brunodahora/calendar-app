import { ReminderType } from '../../../reducers';
import {
  ReminderContainer,
  ReminderColor,
  ReminderDescription,
  ReminderTime,
} from './styles';
import ReminderDropdownTrigger from '../ReminderDropdownTrigger';

type Props = { id: string; index: number; reminder: ReminderType };

const getTimeString = (time: number): string =>
  `${time.toString().substring(0, 2)}:${time.toString().substring(2)}`;

const Reminder = ({ reminder, index, id }: Props): JSX.Element => {
  const { color, time, description } = reminder;
  return (
    <ReminderDropdownTrigger
      id={id}
      index={index}
      reminder={reminder}
      title="Open reminder"
    >
      <ReminderContainer>
        <ReminderColor data-testid="reminder-color" color={color} />
        <ReminderTime>{getTimeString(time)}</ReminderTime>
        <ReminderDescription>{description}</ReminderDescription>
      </ReminderContainer>
    </ReminderDropdownTrigger>
  );
};
export default Reminder;
