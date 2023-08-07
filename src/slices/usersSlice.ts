import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/api/token/`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/api/register/`,
        method: 'POST',
        body: data,
      }),
    }),
    resend_otp: builder.mutation({
      query: (data) => ({
        url: `/api/register/resend_otp/`,
        method: 'POST',
        body: data,
      }),
    }),
    verify_email: builder.mutation({
      query: (data) => ({
        url: `/api/register/verify_email/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `api/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;