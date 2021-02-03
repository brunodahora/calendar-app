/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
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
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const arrowElement = useRef(null);
  const [showReminderDropdown, setShowReminderDropdown] = useState(false);

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      modifiers: [
        { name: 'arrow', options: { element: arrowElement.current } },
      ],
    }
  );

  const openReminderDropdown = () => setShowReminderDropdown(true);
  const closeReminderDropdown = () => setShowReminderDropdown(false);

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
        <IconButton
          title="Delete all reminder"
          onClick={() => console.log('delete_sweep')}
        >
          <DeleteSweep />
        </IconButton>
        {showReminderDropdown && (
          <OutsideClickHandler onOutsideClick={closeReminderDropdown}>
            <div
              ref={popperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <ReminderDropdown />
              <div ref={arrowElement} style={styles.arrow} />
            </div>
          </OutsideClickHandler>
        )}
      </DayHeader>
      <DayFillSpace />
    </DayContainer>
  );
};

export default Day;
