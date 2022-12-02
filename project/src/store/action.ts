import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/types';

export const activeCity = createAction('activeCity', (city: string) => ({
  payload: city,
}));
export const loadOffers = createAction('loadOffers', (offers: Offers) => ({
  payload: offers,
}));
export const setError = createAction('setError', (error: string) => ({
  payload: error,
}));
export const setDataLoadedStatus = createAction(
  'setDataLoadedStatus',
  (isDataLoading: boolean) => ({
    payload: isDataLoading,
  })
);
