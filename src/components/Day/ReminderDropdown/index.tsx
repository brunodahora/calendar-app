import { useState, ChangeEvent } from 'react';
import {
  ReminderDropdownContainer,
  ReminderLabel,
  ReminderInput,
  ReminderFooter,
  ReminderButton,
} from './styles';

type Props = {
  reminder?: {
    description: string;
    color: string;
    time: string;
    city: string;
  };
  closeReminderDropdown: () => void;
};

const ReminderDropdown = ({
  reminder,
  closeReminderDropdown,
}: Props): JSX.Element => {
  const [description, setDescription] = useState(reminder?.description || '');
  const [color, setColor] = useState(reminder?.color || '');
  const [time, setTime] = useState(reminder?.time || '');
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
      alert('Reminder created');
      closeReminderDropdown();
    }
  };

  const isDisabled = !description || !time || !color || !city;

  return (
    <ReminderDropdownContainer>
      <h3>{reminder ? 'Edit' : 'Add'} Reminder</h3>
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
