import {
  DEFAULT_CITY,
  NameSpace,
  Sorter,
  SubmitStatus,
  MAX_COMMENTS,
} from '../../const';
import { State } from '../../types/state';
import { Offers, Comments, Offer } from '../../types/types';
import { getCity, getSort } from '../app-process/selectors';
import { createSelector } from 'reselect';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getOffersLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isOffersDataLoading;
export const getComments = (state: State): Comments =>
  state[NameSpace.Data].comments;
export const getCommentStatus = (state: State): SubmitStatus =>
  state[NameSpace.Data].commentStatus;

export const getNearbyOffers = (state: State): Offers =>
  state[NameSpace.Data].nearbyOffers;
export const selectorOffers = createSelector(
  [getOffers, getCity, getSort],
  (offers, city, sorting) =>
    city === DEFAULT_CITY
      ? offers.filter((offer) => offer.city.name === DEFAULT_CITY).sort(Sorter[sorting])
      : offers.filter((offer) => offer.city.name === city).sort(Sorter[sorting])
);
export const getOffer = (state: State): Offer | null =>
  state[NameSpace.Data].offer;
export const getOfferLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isOfferLoading;

export const limitingComments = createSelector([getComments], (comments) =>
  [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_COMMENTS)
);
