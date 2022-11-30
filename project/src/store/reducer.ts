import { activeCity, loadOffers, setDataLoadedStatus } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const';
import { Offer } from '../types/types';

type initialState = {
  offers: Offer[];
  city: string;
  isDataLoading: boolean;
};

const intialState: initialState = {
  offers: [],
  city: DEFAULT_CITY,
  isDataLoading: false,
};

export const reducer = createReducer(intialState, (builder) => {
  builder
    .addCase(activeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoading = action.payload;
    });
});
