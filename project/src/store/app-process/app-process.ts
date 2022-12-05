import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  city: DEFAULT_CITY,
};

export const appProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    activeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { activeCity } = appProcess.actions;
