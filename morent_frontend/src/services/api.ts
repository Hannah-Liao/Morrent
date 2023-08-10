import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = import.meta.env.VITE_APP_JSEARCH_KEY;

export const api = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers) => {
      headers.set('Bearer', apiKey);
    },
  }),
  endpoints: (builder) => ({
    getCarLists: builder.query({
      query: ({ page }) => {
        return `car-list/${page}`;
      },
    }),
  }),
});

export const { useGetCarListsQuery } = api;
