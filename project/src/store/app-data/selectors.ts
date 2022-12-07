import { DEFAULT_CITY, NameSpace, Sorter } from '../../const';
import { State } from '../../types/state';
import { Offers, Comments } from '../../types/types';
import { getCity, getSort } from '../app-process/selectors';
import { createSelector } from 'reselect';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getOffersLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isOffersDataLoading;
export const getComments = (state: State): Comments =>
  state[NameSpace.Data].comments;
export const getNearbyOffers = (state: State): Offers =>
  state[NameSpace.Data].nearbyOffers;
export const selectorOffers = createSelector(
  [getOffers, getCity, getSort],
  (offers, city, sorting) =>
    city === DEFAULT_CITY
      ? offers.filter((offer) => offer.city.name === DEFAULT_CITY).sort(Sorter[sorting])
      : offers.filter((offer) => offer.city.name === city).sort(Sorter[sorting])
);
