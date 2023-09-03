import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CarDataInfo } from '../types/carInfo';

type resultsSlice = {
  cars: CarDataInfo[];
};

const initialState: resultsSlice = {
  cars: [],
};

const carSearchResults = createSlice({
  name: 'carFilterResults',
  initialState,
  reducers: {
    setCarSearchResults: (state, action: PayloadAction<CarDataInfo[]>) => {
      state.cars = action.payload;
    },
  },
});

export const { setCarSearchResults } = carSearchResults.actions;

export default carSearchResults.reducer;
