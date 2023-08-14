import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type intialStateType = {
  value: string;
};

const initialState: intialStateType = {
  value: 'sport',
};

const carTypeSlices = createSlice({
  name: 'carType',
  initialState,
  reducers: {
    selectCarType: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { selectCarType } = carTypeSlices.actions;

export default carTypeSlices.reducer;
