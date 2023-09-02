import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';
import carFilter from '../slice/carFilterSlice';
import authSlice from '../slice/authSlice';
import loginSlice from '../slice/loginSlice';
import modalSlice from '../slice/modalSlice';
import CarSearchResults from '../slice/carSearchResults';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    carFilter,
    authSlice,
    userInfo: loginSlice,
    modalInfo: modalSlice,
    CarSearchResults,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
