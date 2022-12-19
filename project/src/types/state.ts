import { store } from '../store/index';
import { AuthorizationStatus, SubmitStatus } from '../const';
import { Offers, Comments, SortName, Offer } from './types';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData['email'];
};

export type AppData = {
  offers: Offers;
  isOffersDataLoading: boolean;
  comments: Comments;
  nearbyOffers: Offers;
  offer: Offer | null;
  isOfferLoading: boolean;
  commentStatus: SubmitStatus;
  favoriteOffers: Offers;
  isFavoriteOffersLoading: boolean;
};

export type AppProcess = {
  city: string;
  sorting: SortName;
};
