import { useState } from 'react';
import { ReminderDropdownContainer } from './styles';

type Props = {
  reminder?: {
    description: string;
    color: string;
    time: string;
    city: string;
  };
};

const ReminderDropdown = ({ reminder }: Props): JSX.Element => {
  const [description, setDescription] = useState(reminder?.description || '');
  const [color, setColor] = useState(reminder?.color || '');
  const [time, setTime] = useState(reminder?.time || '');
  const [city, setCity] = useState(reminder?.city || '');

  return <ReminderDropdownContainer>Teste</ReminderDropdownContainer>;
};

export default ReminderDropdown;
