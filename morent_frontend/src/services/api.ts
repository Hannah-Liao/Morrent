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
    getAllCars: builder.query({
      //@ts-ignore
      query: (
        page = 1,
        location: string = '',
        availabilityFrom: string = '',
        availabilityTo: string = '',
      ) => {
        // validate location,page, availibilityFrom and availabilityTo if exists
        const queryString = new URLSearchParams({
          page: page && String(page),
          location: location && location,
          availabilityFrom: availabilityFrom && availabilityFrom,
          availabilityTo: availabilityTo && availabilityTo,
        }).toString();
        console.log(queryString);

        return `/api/car/all-cars?${queryString}`;
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
  useGetAllCarsQuery,
  useLogoutMutation,
} = api;
