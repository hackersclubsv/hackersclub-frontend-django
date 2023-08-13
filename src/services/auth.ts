import axios from 'axios';
import { Dispatch } from 'redux';
import { refreshTokenSuccess, logout } from '../slices/authSlice';
import store from '../store';

export const refreshToken = async () => {
  try {
    // Debug 
    console.log('refreshToken triggered');
    const userInfoString: string | null = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const refreshToken: string | null = userInfo ? userInfo.refresh_token : null;
    if (refreshToken) {
      const response = await axios.post<{access: string; refresh: string}>('http://localhost:8000/api/token/refresh/', { 
        refresh: refreshToken 
      });
      // Debug
      console.log('refreshToken response');
      console.log(response.data);
  
      // Save new access and refresh tokens.
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const updatedUserInfo = {
        ...userInfo,
        access_token: response.data.access,
        refresh_token: response.data.refresh
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

      // Also update Redux store
      store.dispatch(refreshTokenSuccess(updatedUserInfo));
    }
  } catch (error) {
    // If refreshing token fails, log out the user
    store.dispatch(logout());
  }
};

