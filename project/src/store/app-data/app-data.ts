import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SubmitStatus } from '../../const';
import { AppData } from '../../types/state';
import {
  fetchOffersAction,
  fetchCommentsAction,
  fetchNearbyOffers,
  fetchOfferAction,
  postCommentAction,
  fetchFavoriteOffers,
  postFavoriteOffer,
} from '../api-actions';

const initialState: AppData = {
  offers: [],
  isOffersDataLoading: false,
  comments: [],
  nearbyOffers: [],
  offer: null,
  isOfferLoading: false,
  commentStatus: SubmitStatus.Still,
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.commentStatus = SubmitStatus.Pending;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentStatus = SubmitStatus.Fullfilled;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.commentStatus = SubmitStatus.Rejected;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(postFavoriteOffer.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }

        if (updatedOffer.isFavorite) {
          state.favoriteOffers = state.favoriteOffers.concat(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(
            (favoriteOffer) => favoriteOffer.id !== updatedOffer.id
          );
        }
      });
  },
});
