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

        return `/api/car?${queryString}`;
      },
    }),
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
    deleteCar: builder.mutation({
      query: (carID) => ({
        url: `api/car/delete/${carID}`,
        method: 'DELETE',
      }),
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
    getUserById: builder.query({
      query: () => 'api/user/profile',
    }),
    getCarsByUser: builder.query({
      query: () => 'api/car/cars-by-user',
    }),
  }),
});

export const {
  useGetCarListQuery,
  useGetPopularCarsQuery,
  useGetSingleCarQuery,
  useGetCurrentUserQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserByIdQuery,
  useGetCarsByUserQuery,
} = api;
