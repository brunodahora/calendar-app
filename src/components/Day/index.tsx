/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { usePopper } from 'react-popper';
import { useDispatch, useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { ReactComponent as Add } from '../../assets/add.svg';
import { ReactComponent as DeleteSweep } from '../../assets/delete_sweep.svg';
import {
  DayContainer,
  DayHeader,
  DayFillSpace,
  DayNumber,
  IconButton,
} from './styles';
import ReminderDropdown from './ReminderDropdown';
import ReminderList from './ReminderList';
import { actions, selectors } from '../../reducers';

type Props = {
  id: string;
  day: number;
  isWeekend: boolean;
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
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const [showReminderDropdown, setShowReminderDropdown] = useState(false);

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: 'auto',
    }
  );

  const openReminderDropdown = () => setShowReminderDropdown(true);
  const closeReminderDropdown = () => setShowReminderDropdown(false);

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
        <IconButton
          title="Add reminder"
          onClick={openReminderDropdown}
          ref={referenceElement}
        >
          <Add />
        </IconButton>
        {hasReminders && (
          <IconButton title="Delete all reminder" onClick={deleteAllReminders}>
            <DeleteSweep />
          </IconButton>
        )}
        <Portal>
          <div ref={popperElement} style={styles.popper} {...attributes.popper}>
            {showReminderDropdown && (
              <OutsideClickHandler onOutsideClick={closeReminderDropdown}>
                <ReminderDropdown
                  id={id}
                  closeReminderDropdown={closeReminderDropdown}
                />
              </OutsideClickHandler>
            )}
          </div>
        </Portal>
      </DayHeader>
      <ReminderList id={id} />
      <DayFillSpace />
    </DayContainer>
  );
};

export default Day;
