import addMonths from 'date-fns/addMonths';
import parseISO from 'date-fns/parseISO';
import subMonths from 'date-fns/subMonths';
import { combineReducers, createSlice } from '@reduxjs/toolkit';

const currentDateSlice = createSlice({
  name: 'currentDate',
  initialState: new Date().toISOString(),
  reducers: {
    nextMonth: (state) => addMonths(parseISO(state), 1).toISOString(),
    previousMonth: (state) => subMonths(parseISO(state), 1).toISOString(),
  },
});

const rootReducer = combineReducers({
  currentDate: currentDateSlice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const actions = {
  currentDate: currentDateSlice.actions,
};
export const selectors = {
  getCurrentDate: (state: RootState): Date => parseISO(state.currentDate),
};
