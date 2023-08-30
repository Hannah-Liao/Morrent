import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CarDataInfo } from '../types/carInfo';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004',
    credentials: 'include',
  }),
  tagTypes: ['Car'],
  endpoints: (builder) => ({
    getCarList: builder.query({
      query: (page) => {
        return `/api/car?page=${page}`;
      },
    }),

    getPopularCars: builder.query({
      query: () => {
        return `/api/car/popular`;
      },
      transformResponse: ({ data }) => data as CarDataInfo[],
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
  }),
});

export const {
  useGetCarListQuery,
  useGetPopularCarsQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
} = api;
