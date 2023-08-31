import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8004/',
    credentials: 'include',
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
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/user/updateuser/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          'Content-type': 'application/json',
        },
      }),
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
  useUpdateUserMutation,
} = api;
