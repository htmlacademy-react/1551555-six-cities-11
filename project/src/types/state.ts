import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { Offers } from './types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type AppData = {
  offers: Offers;
  isOffersDataLoading: boolean;
};

export type AppProcess = {
  city: string;
};
