import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  ReminderDropdownContainer,
  ReminderLabel,
  ReminderInput,
  ReminderFooter,
  ReminderButton,
  ReminderHeader,
} from './styles';
import { actions, ReminderType } from '../../../reducers';

type Props = {
  id: string;
  reminder?: ReminderType;
  closeReminderDropdown: () => void;
};

const getTimeString = (time: number): string =>
  `${time.toString().substring(0, 2)}:${time.toString().substring(2)}`;

const ReminderDropdown = ({
  id,
  reminder,
  closeReminderDropdown,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(reminder?.description || '');
  const [color, setColor] = useState(reminder?.color || '');
  const [time, setTime] = useState(
    reminder?.time ? getTimeString(reminder.time) : ''
  );
  const [city, setCity] = useState(reminder?.city || '');

  const onChange = (setter: (value: string) => void) => (
    e: ChangeEvent<HTMLInputElement>
  ) => setter(e.currentTarget.value);

  const onSave = () => {
    let errors = '';
    if (time && !/^(0[0-9]|1[0-9]|2[0-3]):?[0-5][0-9]$/.test(time)) {
      errors += '\nTime must be of format HH:mm';
    }
    if (color && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      errors += '\nColor must be a valid Hex value';
    }
    if (errors) alert(errors);
    else {
      dispatch(
        actions.reminders.add({
          date: id,
          reminder: {
            description,
            color,
            time: parseInt(time.replace(/\D/, ''), 10),
            city,
          },
        })
      );
      alert('Reminder created');
      closeReminderDropdown();
    }
  };

  const isDisabled = !description || !time || !color || !city;

  return (
    <ReminderDropdownContainer>
      <ReminderHeader>{reminder ? 'Edit' : 'Add'} Reminder</ReminderHeader>
      <ReminderLabel htmlFor="description">Description</ReminderLabel>
      <ReminderInput
        type="text"
        name="Description"
        id="description"
        value={description}
        onChange={onChange(setDescription)}
      />
      <ReminderLabel htmlFor="time">Time</ReminderLabel>
      <ReminderInput
        type="text"
        name="Time"
        id="time"
        value={time}
        onChange={onChange(setTime)}
      />
      <ReminderLabel htmlFor="color">Color</ReminderLabel>
      <ReminderInput
        type="text"
        name="Color"
        id="color"
        value={color}
        onChange={onChange(setColor)}
      />
      <ReminderLabel htmlFor="city">City</ReminderLabel>
      <ReminderInput
        type="text"
        name="City"
        id="city"
        value={city}
        onChange={onChange(setCity)}
      />
      <ReminderFooter>
        {reminder && (
          <ReminderButton title="Delete" color="red">
            Delete
          </ReminderButton>
        )}
        <ReminderButton
          title="Save"
          color="navy"
          onClick={onSave}
          disabled={isDisabled}
        >
          Save
        </ReminderButton>
      </ReminderFooter>
    </ReminderDropdownContainer>
  );
};

export default ReminderDropdown;
