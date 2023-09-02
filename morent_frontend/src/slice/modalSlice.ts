import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CarDataInfo } from '../types/carInfo';

export type ModalInfo = {
  activeModalName: 'car_info' | 'rent' | null;
  modalData?: CarDataInfo | null;
};

const initialState: ModalInfo = {
  activeModalName: null,
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalInfo>) => {
      state.activeModalName = action.payload.activeModalName;
      state.modalData = action.payload.modalData;
    },
  },
});

export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;
