import { DEFAULT_CITY, NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offers } from '../../types/types';
import { getCity } from '../app-process/selectors';
import { createSelector } from 'reselect';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getOffersLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isOffersDataLoading;
export const selectorOffers = createSelector(
  [getOffers, getCity],
  (offers, city) =>
    city === DEFAULT_CITY
      ? offers.filter((offer) => offer.city.name === DEFAULT_CITY)
      : offers.filter((offer) => offer.city.name === city)
);
