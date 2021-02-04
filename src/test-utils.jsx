import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const getStore = () =>
  configureStore({
    reducer: rootReducer,
  });

const renderWithProvider = (children) =>
  render(<Provider store={getStore()}>{children}</Provider>);

export * from '@testing-library/react';
export { renderWithProvider as render };
