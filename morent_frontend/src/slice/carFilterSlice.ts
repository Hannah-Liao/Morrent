import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type intialStateType = {
  value: {
    type: string[];
    capacity: string[];
  };
};

const initialState: intialStateType = {
  value: {
    type: ['sport'],
    capacity: ['2'],
  },
};

const carFilter = createSlice({
  name: 'carFilter',
  initialState,
  reducers: {
    selectCarType: (state, action: PayloadAction<string>) => {
      const index = state.value.type.indexOf(action.payload);

      if (index !== -1) {
        state.value.type = state.value.type.filter((t) => t !== action.payload);
      } else {
        state.value.type.push(action.payload);
      }
    },
    setCapacity: (state, action: PayloadAction<string>) => {
      const index = state.value.capacity.indexOf(action.payload);

      if (index !== -1) {
        state.value.capacity = state.value.capacity.filter(
          (c) => c !== action.payload,
        );
      } else {
        state.value.capacity.push(action.payload);
      }
    },
  },
});

export const { selectCarType, setCapacity } = carFilter.actions;

export default carFilter.reducer;
