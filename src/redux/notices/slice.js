import { createSlice } from '@reduxjs/toolkit';
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getUserNotices,
  removeUserNotice,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  console.log('action.payload', action.payload);
  state.isLoading = false;
  state.error = action.payload || true;
};

const initialState = {
  ownNotices: [],
  favoriteNotices: [],
  totalItems: null,
  isLoading: false,
  error: false,
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  //   reducers: {
  //     changeError(state, action) {
  //       state.error = false;
  //     },
  //   },
  extraReducers: {
    [getFavorites.fulfilled](state, action) {
      if (
        !action.payload.results.some(item =>
          state.favoriteNotices.includes(item)
        )
      ) {
        state.favoriteNotices.push(...action.payload.results);
      }
      state.totalItems = action.payload.totalItems;

      state.isLoading = false;
      state.error = false;
    },
    [addToFavorites.fulfilled](state, action) {
      state.favoriteNotices.unshift(action.payload);

      state.isLoading = false;
      state.error = false;
    },
    [removeFromFavorites.fulfilled](state, action) {
      const index = state.favoriteNotices.indexOf(action.payload.result);
      state.favoriteNotices.splice(index, 1);

      state.isLoading = false;
      state.error = false;
    },
    [getUserNotices.fulfilled](state, action) {
      if (
        !action.payload.results.some(item => state.ownNotices.includes(item))
      ) {
        state.ownNotices.push(...action.payload.results);
      }
      state.totalItems = action.payload.totalItems;

      state.isLoading = false;
      state.error = false;
    },
    [removeUserNotice.fulfilled](state, action) {
      const index = state.ownNotices.indexOf(action.payload.result);
      state.ownNotices.splice(index, 1);

      state.isLoading = false;
      state.error = false;
    },
    // [getByCategory.pending]: handlePending,
    [getFavorites.pending]: handlePending,
    [addToFavorites.pending]: handlePending,
    [removeFromFavorites.pending]: handlePending,
    [getUserNotices.pending]: handlePending,
    [removeUserNotice.pending]: handlePending,

    // [getByCategory.rejected]: handleRejected,
    [getFavorites.rejected]: handleRejected,
    [addToFavorites.rejected]: handleRejected,
    [removeFromFavorites.rejected]: handleRejected,
    [getUserNotices.rejected]: handleRejected,
    [removeUserNotice.rejected]: handleRejected,
  },
});

// export const { changeError } = authSlice.actions;
export const noticesReducer = noticesSlice.reducer;
