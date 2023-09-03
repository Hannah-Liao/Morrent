import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CarDataInfo } from '../types/carInfo';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
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
    updateUser: builder.mutation({
      query: (user) => ({
        url: 'api/user/update-user',
        method: 'PUT',
        body: user,
      }),
    }),
    getUserById: builder.query({
      query: () => 'api/user/profile',
    }),
    getCarsByUser: builder.query({
      query: () => 'api/car/cars-by-user',
    }),
    getFavCars: builder.query({
      query: (userId) => {
        return {
          url: userId && `api/car/fav-car/${userId}`,
        };
      },
    }),
    addFavCar: builder.mutation({
      query: ({ userId, carId }) => {
        return {
          url: 'api/car/add-fav-car',
          method: 'PUT',
          body: {
            carId,
            userId,
          },
        };
      },
    }),
    deleteFavCar: builder.mutation({
      query: ({ userId, carId }) => {
        return {
          url: `api/car/delete-fav-car/${userId}`,
          method: 'PATCH',
          body: {
            carId,
            userId,
          },
        };
      },
    }),
  }),
});

export const {
  useGetPopularCarsQuery,
  useGetCarListQuery,
  useGetSingleCarQuery,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useGetCarsByUserQuery,
  useGetFavCarsQuery,
  useAddFavCarMutation,
  useDeleteFavCarMutation,
} = api;
