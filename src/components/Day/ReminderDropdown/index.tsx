import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  ReminderDropdownContainer,
  ReminderLabel,
  ReminderInput,
  ReminderFooter,
  ReminderButton,
  ReminderHeader,
  ReminderWeather,
} from './styles';
import { actions, ReminderType } from '../../../reducers';

type Props = {
  id: string;
  reminder?: ReminderType;
  index?: number;
  closeReminderDropdown: () => void;
};

const getTimeString = (time: number): string =>
  `${time.toString().substring(0, 2)}:${time.toString().substring(2)}`;

const ReminderDropdown = ({
  id,
  reminder,
  index,
  closeReminderDropdown,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(reminder?.description || '');
  const [color, setColor] = useState(reminder?.color || '');
  const [time, setTime] = useState(
    reminder?.time ? getTimeString(reminder.time) : ''
  );
  const [city, setCity] = useState(reminder?.city || '');
  const [weather, setWeather] = useState('Loading...');

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
    if (index !== undefined) {
      dispatch(
        actions.reminders.edit({
          date: id,
          index,
          reminder: {
            description,
            color,
            time: parseInt(time.replace(/\D/, ''), 10),
            city,
          },
        })
      );
      alert('Reminder edited');
      closeReminderDropdown();
    } else {
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

  const onDelete = () => {
    dispatch(actions.reminders.delete({ date: id, index }));
    alert('Reminder deleted');
    closeReminderDropdown();
  };

  const isDisabled = !description || !time || !color || !city;

  useEffect(() => {
    if (reminder) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?appid=b9c49334791b5f77a7dbc6df7f87f187&units=metric&q=${reminder.city}`
      )
        .then((response) => response.json())
        .then((json) => setWeather(json?.weather[0].main))
        .catch(() => setWeather('ERROR'));
    }
  }, [reminder]);

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
        maxLength={30}
      />
      <ReminderLabel htmlFor="time">Time</ReminderLabel>
      <ReminderInput
        type="text"
        name="Time"
        id="time"
        value={time}
        onChange={onChange(setTime)}
        maxLength={5}
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
      {reminder && (
        <ReminderWeather>
          <b>Weather: </b>
          {weather}
        </ReminderWeather>
      )}
      <ReminderFooter>
        {reminder && weather !== 'ERROR' && (
          <ReminderButton title="Delete" color="red" onClick={onDelete}>
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
