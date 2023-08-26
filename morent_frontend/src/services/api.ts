import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const apiKey = import.meta.env.VITE_APP_JSEARCH_KEY;

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004/',
    // prepareHeaders: (headers) => {
    // headers.set('Bearer', apiKey);
    // },
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
  }),
});

export const { useGetCarListsQuery, useSignupMutation, useLoginMutation } = api;
