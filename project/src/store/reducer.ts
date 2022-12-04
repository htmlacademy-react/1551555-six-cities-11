import {
  activeCity,
  loadOffers,
  setOffersDataLoadingStatus,
  requireAuthorization,
} from './action';
import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, AuthorizationStatus } from '../const';
import { Offer } from '../types/types';

type initialState = {
  offers: Offer[];
  city: string;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
};

const intialState: initialState = {
  offers: [],
  city: DEFAULT_CITY,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(intialState, (builder) => {
  builder
    .addCase(activeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
