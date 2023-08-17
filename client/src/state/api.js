import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Vacancy", "AppBasicDetails"],
  endpoints: (builder) => ({
    getVacancies: builder.query({
      query: () => `/vacancy`,
      providesTags: ["Vacancy"],
    }),
    getVacancyBySearch: builder.query({
      query: (searchQuery) => `/vacancy/search/?searchQuery=${searchQuery}`,
      providesTags: ["Vacancy"],
    }),
    getAppBasicDetails: builder.query({
      query: ({ userId, vacancyId }) => ({
        url: `/application/basicDetails/?vacancyId=${vacancyId}&userId=${userId}`,
      }),
      providesTags: ["AppBasicDetails"],
    }),
    createAppBasicDetails: builder.mutation({
      query: (createReq) => ({
        url: `/application/addBasicDetails`,
        method: "POST",
        body: createReq,
      }),
      invalidatesTags: ["AppBasicDetails"],
    }),
  }),
});

export const {
  useGetVacanciesQuery,
  useGetVacancyBySearchQuery,
  useCreateAppBasicDetailsMutation,
  useGetAppBasicDetailsQuery,
} = api;