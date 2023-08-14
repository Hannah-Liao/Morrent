import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';
import selectCarType from '../slice/carFilterSlice';
import setCapacity from '../slice/carCapacity';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    selectCarType,
    setCapacity,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
