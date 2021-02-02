import styled from 'styled-components';

export const CalendarGrid = styled.main`
  background-color: #666666;
  border: 1px solid #666666;
  display: grid;
  flex: 1;
  grid-gap: 1px;
  grid-template-columns: repeat(7, 1fr);
  height: auto;
  justify-self: center;
  width: auto;
`;
