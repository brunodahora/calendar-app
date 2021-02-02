import Calendar from './components/Calendar';
import DaysOfTheWeek from './components/DaysOfTheWeek';
import MonthYear from './components/MonthYear';

const App = (): JSX.Element => (
  <>
    <MonthYear />
    <DaysOfTheWeek />
    <Calendar />
  </>
);

export default App;
