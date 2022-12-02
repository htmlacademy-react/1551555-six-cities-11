import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/types.js';
import { loadOffers, setDataLoadedStatus } from './action';
import { APIRoute } from '../const';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoadedStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(loadOffers(data));
  dispatch(setDataLoadedStatus(false));
});
