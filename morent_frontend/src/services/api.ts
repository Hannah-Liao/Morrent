import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004/',
  }),

  endpoints: (builder) => ({
    addCar: builder.mutation({
      query: (car) => ({
        url: `api/car`,
        method: 'POST',
        body: car,
      }),
    }),
    updateCar: builder.mutation({
      query: ({ car, carID }) => ({
        url: `api/car/update/${carID}`,
        method: 'PUT',
        body: car,
      }),
    }),
  }),
});

export const { useAddCarMutation, useUpdateCarMutation } = api;
