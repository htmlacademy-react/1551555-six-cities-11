import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY, Sorting } from '../../const';
import { AppProcess } from '../../types/state';
import { SortName } from '../../types/types';

const initialState: AppProcess = {
  city: DEFAULT_CITY,
  sorting: Sorting.Popular,
};

export const appProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    activeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    activeSorting: (state, action: PayloadAction<SortName>) => {
      state.sorting = action.payload;
    },
  },
});

export const { activeCity, activeSorting } = appProcess.actions;
