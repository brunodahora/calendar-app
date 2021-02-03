import styled from 'styled-components';

type ReminderButtonProps = { color: string };

export const ReminderDropdownContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 500px;
  padding: 8px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const ReminderLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

export const ReminderInput = styled.input`
  border-bottom: 1px solid navy;
  border-left: none;
  border-right: none;
  border-top: none;
  flex: 1;
  font-size: 16px;
  line-height: 24px;
  padding: 4px;
  margin-bottom: 16px;

  :focus {
    outline: navy auto 1px;
  }
`;

export const ReminderButton = styled.button<ReminderButtonProps>`
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 8px;

  & + & {
    margin-left: 8px;
  }
`;

export const ReminderFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;

  :disabled {
    color: #666666;
    background-color: E6E6E6;
  }
`;
