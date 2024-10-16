import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logOut, refreshUser } from './operations';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.error = null;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearCredentials } = authSlice.actions;
export default authSlice.reducer;
