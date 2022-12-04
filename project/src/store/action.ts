import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';

export const activeCity = createAction('data/activeCity', (city: string) => ({
  payload: city,
}));
export const loadOffers = createAction('data/loadOffers', (offers: Offers) => ({
  payload: offers,
}));
export const setOffersDataLoadingStatus = createAction(
  'data/setOffersDataLoadingStatus',
  (isDataLoading: boolean) => ({
    payload: isDataLoading,
  })
);
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
