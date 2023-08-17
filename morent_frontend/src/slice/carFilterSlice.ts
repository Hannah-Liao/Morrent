import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type intialStateType = {
  value: {
    type: string;
    capacity: string;
  };
};

const initialState: intialStateType = {
  value: {
    type: 'sport',
    capacity: '2',
  },
};

const carFilter = createSlice({
  name: 'carFilter',
  initialState,
  reducers: {
    selectCarType: (state, action: PayloadAction<string>) => {
      state.value.type = action.payload;
    },
    setCapacity: (state, action: PayloadAction<string>) => {
      state.value.capacity = action.payload;
    },
  },
});

export const { selectCarType, setCapacity } = carFilter.actions;

export default carFilter.reducer;
