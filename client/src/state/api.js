import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Vacancy",
    "AppBasicDetails",
    "AppEduDetails",
    "AppExpDetails",
    "AppOtherDetails",
  ],
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
    getAppExpDetails: builder.query({
      query: ({ userId }) => ({
        url: `/application/experience/?userId=${userId}`,
      }),
      providesTags: ["AppExpDetails"],
    }),
    getAppOtherDetails: builder.query({
      query: ({ userId }) => ({
        url: `/application/otherDetails/?userId=${userId}`,
      }),
      providesTags: ["AppOtherDetails"],
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
      query: ({ createReq, attachment }) => {
        const formData = new FormData();
        createReq.eduDetailsId &&
          formData.append("eduDetailsId", createReq.eduDetailsId);
        formData.append("eduTypeId", createReq.eduTypeId);
        formData.append("instituteName", createReq.instituteName);
        formData.append("qualification", createReq.qualification);
        formData.append("fieldOfStudy", createReq.fieldOfStudy);
        formData.append("startDate", createReq.startDate);
        formData.append("endDate", createReq.endDate);
        formData.append("grade", createReq.grade);
        formData.append("attachmentPath", createReq.attachmentPath);
        formData.append("attachment", attachment);
        return {
          url: `/application/addEduDetails`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["AppEduDetails"],
    }),
    createAppExperience: builder.mutation({
      query: (createReq) => ({
        url: `/application/addExpDetails`,
        method: "POST",
        body: createReq,
      }),
      invalidatesTags: ["AppExpDetails"],
    }),
    createAppAchievement: builder.mutation({
      query: (createReq) => ({
        url: `/application/addOtherDetails`,
        method: "POST",
        body: createReq,
      }),
      invalidatesTags: ["AppOtherDetails"],
    }),
    createApplicationSubmission: builder.mutation({
      query: (createReq) => ({
        url: `/application/submitApplication`,
        method: "POST",
        body: createReq,
      }),
    }),
    deleteAppEducation: builder.mutation({
      query: (detailId) => ({
        url: `/application/deleteEduDetail?detailId=${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppEduDetails"],
    }),
    deleteAppExperience: builder.mutation({
      query: (detailId) => ({
        url: `/application/deleteExpDetail?detailId=${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppExpDetails"],
    }),
    deleteAppAchievement: builder.mutation({
      query: (detailId) => ({
        url: `/application/deleteOtherDetail?detailId=${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppOtherDetails"],
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
  useCreateApplicationSubmissionMutation,
  useGetAppBasicDetailsQuery,
  useGetAppEduDetailsQuery,
  useGetAppExpDetailsQuery,
  useGetAppOtherDetailsQuery,
  useDeleteAppEducationMutation,
  useDeleteAppExperienceMutation,
  useDeleteAppAchievementMutation,
} = api;
