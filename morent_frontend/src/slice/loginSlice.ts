import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type LoginInfoType = {
  isLoggedIn: boolean;
  userId: string | null;
};

const initialState: LoginInfoType = {
  isLoggedIn: false,
  userId: null,
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    updateLogin: (state, action: PayloadAction<LoginInfoType>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
    },
  },
});

export const { updateLogin } = loginSlice.actions;

export default loginSlice.reducer;
