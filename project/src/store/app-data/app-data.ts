import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SubmitStatus } from '../../const';
import { AppData } from '../../types/state';
import {
  fetchOffersAction,
  fetchCommentsAction,
  fetchNearbyOffers,
  fetchOfferAction,
  postCommentAction,
} from '../api-actions';

const initialState: AppData = {
  offers: [],
  isOffersDataLoading: false,
  comments: [],
  nearbyOffers: [],
  offer: null,
  isOfferLoading: false,
  commentStatus: SubmitStatus.Still,
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
      });
  },
});
