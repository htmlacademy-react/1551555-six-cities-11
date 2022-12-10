import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { Offers, Comments, SortName, Offer } from './types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type AppData = {
  offers: Offers;
  isOffersDataLoading: boolean;
  comments: Comments;
  nearbyOffers: Offers;
  offer: Offer| null;
  isOfferLoading: boolean;
};

export type AppProcess = {
  city: string;
  sorting: SortName;
};
