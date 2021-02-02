import styled from 'styled-components';

const DaysOfTheWeekContainer = styled.div`
  background-color: steelblue;
  border: 1px solid gray;
  display: flex;
  flex-direction: row;
`;

const DayOfTheWeek = styled.h2`
  align-items: center;
  display: flex;
  color: white;
  flex: 1;
  font-size: 14px;
  justify-content: center;
  margin: 0;
`;

const DaysOfTheWeek = (): JSX.Element => (
  <DaysOfTheWeekContainer>
    <DayOfTheWeek>Sunday</DayOfTheWeek>
    <DayOfTheWeek>Monday</DayOfTheWeek>
    <DayOfTheWeek>Tuesday</DayOfTheWeek>
    <DayOfTheWeek>Wednesday</DayOfTheWeek>
    <DayOfTheWeek>Thursday</DayOfTheWeek>
    <DayOfTheWeek>Friday</DayOfTheWeek>
    <DayOfTheWeek>Saturday</DayOfTheWeek>
  </DaysOfTheWeekContainer>
);
export default DaysOfTheWeek;
