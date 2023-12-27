import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", localStorage.getItem("profile"));
      return headers;
    },
  }),
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
      query: (searchQuery) => {
        return { url: `/vacancy/search/`, params: { ...searchQuery } };
      },
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
      query: (createReq) => {
        const formData = new FormData();
        createReq.eduDetailsId &&
          formData.append("eduDetailsId", createReq.eduDetailsId);
        formData.append("eduTypeId", createReq.eduTypeId);
        formData.append("userId", createReq.userId);
        formData.append("instituteName", createReq.instituteName);
        formData.append("qualification", createReq.qualification);
        formData.append("fieldOfStudy", createReq.fieldOfStudy);
        formData.append("startDate", createReq.startDate);
        formData.append("endDate", createReq.endDate);
        formData.append("grade", createReq.grade);
        formData.append("attachmentPath", createReq.attachmentPath);
        formData.append("attachment", createReq.attachment);
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
      query: (createReq) => {
        const formData = new FormData();
        createReq.expDetailId &&
          formData.append("expDetailId", createReq.expDetailId);
        formData.append("userId", createReq.userId);
        formData.append("title", createReq.title);
        formData.append("organization", createReq.organization);
        formData.append("startDate", createReq.startDate);
        formData.append("endDate", createReq.endDate);
        formData.append("description", createReq.description);
        formData.append("attachmentPath", createReq.attachmentPath);
        formData.append("attachment", createReq.attachment);
        return {
          url: `/application/addExpDetails`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["AppExpDetails"],
    }),
    createAppAchievement: builder.mutation({
      query: (createReq) => {
        const formData = new FormData();
        createReq.achvDetailId &&
          formData.append("achvDetailId", createReq.achvDetailId);
        formData.append("userId", createReq.userId);
        formData.append("title", createReq.title);
        formData.append("organization", createReq.organization);
        formData.append("startDate", createReq.startDate);
        formData.append("endDate", createReq.endDate);
        formData.append("description", createReq.description);
        formData.append("attachmentPath", createReq.attachmentPath);
        formData.append("attachment", createReq.attachment);
        return {
          url: `/application/addOtherDetails`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["AppOtherDetails"],
    }),
    createApplicationSubmission: builder.mutation({
      query: (createReq) => {
        const formData = new FormData();
        formData.append("vacancyId", createReq.vacancyId);
        formData.append("userId", createReq.userId);
        formData.append("cvPath", createReq.cvPath);
        formData.append("nicPath", createReq.nicPath);
        formData.append("birthCertificatePath", createReq.birthCertificatePath);
        formData.append("cv", createReq.cv);
        formData.append("nic", createReq.nic);
        formData.append("birthCertificate", createReq.birthCertificate);
        return {
          url: `/application/submitApplication`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
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
