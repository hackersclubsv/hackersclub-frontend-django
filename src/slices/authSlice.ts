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
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
