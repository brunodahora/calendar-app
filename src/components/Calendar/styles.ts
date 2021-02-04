import styled from 'styled-components';

export const CalendarGrid = styled.main`
  background-color: #666666;
  border: 1px solid #666666;
  display: grid;
  flex: 1;
  grid-auto-rows: minmax(0, 1fr);
  grid-gap: 1px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  height: calc(100vh - 124px);
  justify-self: center;
  width: auto;
`;
