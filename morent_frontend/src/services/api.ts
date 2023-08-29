import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CarDataInfo } from '../types/carInfo';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004',
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
  }),
});

export const { useGetCarListQuery, useGetPopularCarsQuery } = api;
