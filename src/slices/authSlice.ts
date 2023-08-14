import { createSlice } from '@reduxjs/toolkit';

const localInfo = localStorage.getItem('userInfo');

const initialState = {
  userInfo: localInfo ? JSON.parse(localInfo) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // state.userInfo = action.payload.data;
      state.userInfo = action.payload;
      console.log(state.userInfo);
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    refreshTokenSuccess: (state, action) => {
      // Update tokens in state
      state.userInfo.access_token = action.payload.access;
      state.userInfo.refresh_token = action.payload.refresh;
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, refreshTokenSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
