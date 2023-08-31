import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004/',
  }),
  endpoints: (builder) => ({
    getCarLists: builder.query({
      query: () => ({
        url: `api/car`,
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
  useGetCarListsQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetFavCarsQuery,
  useAddFavCarMutation,
} = api;
