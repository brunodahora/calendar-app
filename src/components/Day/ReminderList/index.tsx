import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectors, ReminderType } from '../../../reducers';
import Reminder from './Reminder';

type Props = { id: string };

const ReminderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ReminderList = ({ id }: Props): JSX.Element => {
  const reminders = useSelector(selectors.getReminders(id));
  return (
    <ReminderListContainer>
      {reminders &&
        reminders.map((reminder: ReminderType, index) => (
          <Reminder key={`${id}-${index}`} index={index} {...reminder} />
        ))}
    </ReminderListContainer>
  );
};
export default ReminderList;
