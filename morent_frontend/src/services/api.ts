import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CarDataInfo } from '../types/carInfo';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004',
  }),
  endpoints: (builder) => ({
    getCarList: builder.query({
      query: () => {
        return '/api/car';
      },
    }),
    getPopularCars: builder.query({
      query: () => {
        return '/api/car/popular';
      },
      transformResponse: ({ cars }) => cars.slice(0, 4) as CarDataInfo[],
    }),
  }),
});

export const { useGetCarListQuery, useGetPopularCarsQuery } = api;
