import { configureStore } from '@reduxjs/toolkit';
import currentMainComponentReducer from './currentMainComponentSlice';

// Drawer
import drawerReducer from './drawerSlice';

const store = configureStore({
  reducer: {
    currentMainComponent: currentMainComponentReducer,
    drawer: drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;