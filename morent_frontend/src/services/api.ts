import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004/',
  }),

  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => 'api/user/current-user',
    }),
    getSingleCar: builder.query({
      query: (carID) => `api/car/get-single-car/${carID}`,
    }),
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

export const {
  useGetSingleCarQuery,
  useGetCurrentUserQuery,
  useAddCarMutation,
  useUpdateCarMutation,
} = api;
