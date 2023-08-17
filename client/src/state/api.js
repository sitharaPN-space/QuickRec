import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Vacancy"],
  endpoints: (builder) => ({
    getVacancies: builder.query({
      query: () => `/vacancy`,
      providesTags: ["Vacancy"],
    }),
    getVacancyBySearch: builder.query({
      query: (searchQuery) => `/vacancy/search/?searchQuery=${searchQuery}`,
      providesTags: ["Vacancy"],
    }),
  }),
});

export const { useGetVacanciesQuery, useGetVacancyBySearchQuery } = api;
