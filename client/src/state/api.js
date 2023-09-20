import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Vacancy", "AppBasicDetails", "AppEduDetails"],
  endpoints: (builder) => ({
    getVacancyBySearch: builder.query({
      query: (searchQuery) => `/vacancy/search/?searchQuery=${searchQuery}`,
      providesTags: ["Vacancy"],
    }),
    getAppBasicDetails: builder.query({
      query: ({ userId }) => ({
        url: `/application/basicDetails/?userId=${userId}`,
      }),
      providesTags: ["AppBasicDetails"],
    }),
    getAppEduDetails: builder.query({
      query: ({ userId }) => ({
        url: `/application/education/?userId=${userId}`,
      }),
      providesTags: ["AppEduDetails"],
    }),
    createAppBasicDetails: builder.mutation({
      query: (createReq) => ({
        url: `/application/addBasicDetails`,
        method: "POST",
        body: createReq,
      }),
      invalidatesTags: ["AppBasicDetails"],
    }),
    createAppEducation: builder.mutation({
      query: (createReq) => ({
        url: `/application/addEduDetails`,
        method: "POST",
        body: createReq,
      }),
    }),
    createAppExperience: builder.mutation({
      query: (createReq) => ({
        url: `/application/addExpDetails`,
        method: "POST",
        body: createReq,
      }),
    }),
    createAppAchievement: builder.mutation({
      query: (createReq) => ({
        url: `/application/addOtherDetails`,
        method: "POST",
        body: createReq,
      }),
    }),
  }),
});

export const {
  useGetVacanciesQuery,
  useGetVacancyBySearchQuery,
  useCreateAppBasicDetailsMutation,
  useCreateAppEducationMutation,
  useCreateAppExperienceMutation,
  useCreateAppAchievementMutation,
  useGetAppBasicDetailsQuery,
  useGetAppEduDetailsQuery,
} = api;
