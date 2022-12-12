import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offers, Comments, Offer } from '../types/types.js';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CommentAuth } from '../types/comment-auth';

export const fetchOffersAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);

  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  Comments,
  number,
  {
    dispatsh: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const postCommentAction = createAsyncThunk<
  Comments,
  CommentAuth,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Comments>(`${APIRoute.Comments}/${id}`, {
      comment,
      rating,
    });
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  Offers,
  number,
  {
    dispatsh: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
  return data;
});

export const fetchOfferAction = createAsyncThunk<
  Offer,
  number,
  {
    dispatsh: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api.get(APIRoute.Login);
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);

    dispatch(redirectToRoute(AppRoute.Favorites));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
