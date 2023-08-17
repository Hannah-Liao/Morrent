import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CapacityTypes = {
  value: string;
};

const initialState: CapacityTypes = {
  value: '2',
};

export const CapacitySlices = createSlice({
  name: 'capacity',
  initialState,
  reducers: {
    setCapacity: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setCapacity } = CapacitySlices.actions;

export default CapacitySlices.reducer;
