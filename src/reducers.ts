import addMonths from 'date-fns/addMonths';
import parseISO from 'date-fns/parseISO';
import subMonths from 'date-fns/subMonths';
import {
  combineReducers,
  createSlice,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';

export type ReminderType = {
  description: string;
  color: string;
  time: number;
  city: string;
};

const currentDateSlice = createSlice({
  name: 'currentDate',
  initialState: new Date().toISOString(),
  reducers: {
    nextMonth: (state) => addMonths(parseISO(state), 1).toISOString(),
    previousMonth: (state) => subMonths(parseISO(state), 1).toISOString(),
  },
});

const sortReminders = (reminderA: ReminderType, reminderB: ReminderType) => {
  if (reminderA.time < reminderB.time) return -1;
  if (reminderA.time > reminderB.time) return 1;
  return 0;
};

type ReminderSliceState = { [key: string]: Array<ReminderType> };
const remindersSlice: Slice<ReminderSliceState> = createSlice({
  name: 'reminders',
  initialState: {} as ReminderSliceState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{ date: string; reminder: ReminderType }, string>
    ) => {
      const {
        payload: { date, reminder },
      } = action;
      const newReminders = state[date]
        ? [...state[date], reminder].sort(sortReminders)
        : [reminder];
      return {
        ...state,
        [date]: newReminders,
      };
    },
    edit: (
      state,
      action: PayloadAction<
        { date: string; index: number; reminder: ReminderType },
        string
      >
    ) => {
      const {
        payload: { date, index, reminder },
      } = action;
      const newReminders = state[date].filter((_, i) => index !== i) || [];
      return {
        ...state,
        [date]: [...newReminders, reminder].sort(sortReminders),
      };
    },
    delete: (
      state,
      action: PayloadAction<{ date: string; index: number }, string>
    ) => {
      const {
        payload: { date, index },
      } = action;
      return {
        ...state,
        [date]: state[date].filter((_, i) => index !== i),
      };
    },
    deleteAll: (state, action: PayloadAction<string, string>) => {
      return {
        ...state,
        [action.payload]: [],
      };
    },
  },
});

const rootReducer = combineReducers({
  currentDate: currentDateSlice.reducer,
  reminders: remindersSlice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const actions = {
  currentDate: currentDateSlice.actions,
  reminders: remindersSlice.actions,
};
export const selectors = {
  getCurrentDate: (state: RootState): Date => parseISO(state.currentDate),
  getReminders: (date: string) => (
    state: RootState
  ): Array<ReminderType> | null => state.reminders[date],
  hasReminders: (date: string) => (state: RootState): boolean =>
    !!state.reminders[date] && state.reminders[date].length > 0,
};
