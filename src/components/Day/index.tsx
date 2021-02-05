import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Add } from '../../assets/add.svg';
import { ReactComponent as DeleteSweep } from '../../assets/delete_sweep.svg';
import {
  DayContainer,
  DayHeader,
  DayFillSpace,
  DayNumber,
  IconButton,
} from './styles';
import ReminderDropdownTrigger from './ReminderDropdownTrigger';
import ReminderList from './ReminderList';
import { actions, selectors } from '../../reducers';

type Props = {
  id: string;
  day: number;
  isWeekend?: boolean;
  isCurrentMonth?: boolean;
};

const Day = ({
  id,
  day,
  isWeekend,
  isCurrentMonth = false,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const hasReminders = useSelector(selectors.hasReminders(id));

  const deleteAllReminders = () => {
    dispatch(actions.reminders.deleteAll(id));
    alert('All reminders deleted');
  };

  return (
    <DayContainer data-testid={id} isWeekend={isWeekend}>
      <DayHeader>
        <DayNumber isWeekend={isWeekend} isCurrentMonth={isCurrentMonth}>
          {day}
        </DayNumber>
        <DayFillSpace />
        <ReminderDropdownTrigger title="Add reminder" id={id} centralize>
          <Add />
        </ReminderDropdownTrigger>
        {hasReminders && (
          <IconButton title="Delete all reminder" onClick={deleteAllReminders}>
            <DeleteSweep />
          </IconButton>
        )}
      </DayHeader>
      <ReminderList id={id} />
      <DayFillSpace />
    </DayContainer>
  );
};

export default Day;
