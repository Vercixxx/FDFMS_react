import { configureStore } from '@reduxjs/toolkit';
import currentMainComponentReducer from './currentMainComponentSlice';

const store = configureStore({
  reducer: {
    currentMainComponent: currentMainComponentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;