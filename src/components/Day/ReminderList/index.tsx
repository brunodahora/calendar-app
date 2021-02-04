import { useSelector } from 'react-redux';
import { selectors, ReminderType } from '../../../reducers';
import Reminder from './Reminder';
import { ReminderListContainer } from './styles';

type Props = { id: string };

const ReminderList = ({ id }: Props): JSX.Element => {
  const reminders = useSelector(selectors.getReminders(id));
  return (
    <ReminderListContainer>
      {reminders &&
        reminders.map((reminder: ReminderType, index) => (
          <Reminder
            key={`${id}-${index}`}
            index={index}
            id={id}
            reminder={reminder}
          />
        ))}
    </ReminderListContainer>
  );
};
export default ReminderList;
