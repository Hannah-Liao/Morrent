import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004/',
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getCarLists: builder.query({
      query: () => ({
        url: `api/car`,
      }),
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
  }),
});

export const {
  useGetSingleCarQuery,
  useGetCurrentUserQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetFavCarsQuery,
  useAddFavCarMutation,
} = api;
