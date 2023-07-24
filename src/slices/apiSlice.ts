import { RootState } from '../store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery(
  { baseUrl: '',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userInfo?.access;
      if (token) {
        headers.set('authorization', `Token ${token}`);
      }
      return headers;
    }
  });

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});

