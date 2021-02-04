/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import ReminderDropdown from './ReminderDropdown';
import { ReminderType } from '../../reducers';

const InvisibleButton = styled.button`
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

type Props = {
  children: React.ReactNode;
  id: string;
  title: string;
  reminder?: ReminderType;
};

const ReminderDropdownTrigger = ({
  children,
  id,
  title,
  reminder,
}: Props): JSX.Element => {
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const [showReminderDropdown, setShowReminderDropdown] = useState(false);

  const openReminderDropdown = () => setShowReminderDropdown(true);
  const closeReminderDropdown = () => setShowReminderDropdown(false);

  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: 'auto',
    }
  );

  return (
    <>
      <InvisibleButton
        title={title}
        onClick={openReminderDropdown}
        ref={referenceElement}
      >
        {children}
      </InvisibleButton>
      <Portal>
        <div ref={popperElement} style={styles.popper} {...attributes.popper}>
          {showReminderDropdown && (
            <OutsideClickHandler onOutsideClick={closeReminderDropdown}>
              <ReminderDropdown
                id={id}
                closeReminderDropdown={closeReminderDropdown}
                reminder={reminder}
              />
            </OutsideClickHandler>
          )}
        </div>
      </Portal>
    </>
  );
};
export default ReminderDropdownTrigger;
