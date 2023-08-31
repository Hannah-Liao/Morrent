import { createSlice } from '@reduxjs/toolkit';

export type intialStateType = {
  userID: string | null;
};

const initialState: intialStateType = {
  userID: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const { userID } = action.payload;
      state.userID = userID;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
