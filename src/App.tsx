import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import Calendar from './components/Calendar';
import DaysOfTheWeek from './components/DaysOfTheWeek';
import MonthYear from './components/MonthYear';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

const App = (): JSX.Element => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <header>
        <MonthYear />
        <DaysOfTheWeek />
      </header>
      <Calendar />
    </PersistGate>
  </Provider>
);

export default App;
