import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004/',
  }),
  endpoints: (builder) => ({
    getCarLists: builder.query({
      query: ({ page }) => {
        return `car-list/${page}`;
      },
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: 'api/user/signin',
        method: 'POST',
        body: userInfo,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: 'api/user/signup',
        method: 'POST',
        body: userInfo,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'api/user/logout',
        method: 'POST',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/user/updateuser/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetCarListsQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
} = api;
