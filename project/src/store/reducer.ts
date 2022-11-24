import { activeCity } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { cities } from '../mocks/cities';

const intialState = {
  offers: offers,
  cities: cities,
  city: 'Paris',
};

export const reducer = createReducer(intialState, (builder) => {
  builder.addCase(activeCity, (state, action) => {
    state.city = action.payload;
  });
});
