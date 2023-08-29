import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type initialStateType = {
  email: string;
  isLoggedIn: boolean;
};

const initialState: initialStateType = {
  email: '',
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    updateLogin: (
      state,
      action: PayloadAction<{ email: string; isLoggedIn: boolean }>,
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.email = action.payload.email;
    },
  },
});

export const { updateLogin } = loginSlice.actions;

export default loginSlice.reducer;
