import styled from 'styled-components';

export const ReminderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const ReminderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 20px;
`;

type ColorProps = { color: string };

export const ReminderColor = styled.div<ColorProps>`
  background-color: ${({ color }) => color};
  border-radius: 50%;
  height: 12px;
  width: 12px;
  margin-right: 8px;
`;

export const ReminderTime = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

export const ReminderDescription = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
