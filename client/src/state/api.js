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
      query: ({ userId }) => ({
        url: `/application/basicDetails/?userId=${userId}`,
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
    getAppEduDetails: builder.query({
      query: ({ userId }) => ({
        url: `application/eduDetails/?userId=${userId}`,
      }),
      providesTags: ["AppEduDetails"],
    }),
    getAppEduDetailById: builder.query({
      query: ({ id }) => ({
        url: `/application/eduDetail/?eduId=${id}`,
      }),
      providesTags: ["AppEduDetails"],
    }),
    createAppEduDetails: builder.mutation({
      query: (createEduReq) => {
        const formData = new FormData();
        formData.append("userId", createEduReq.userId);
        formData.append("eduTypeId", createEduReq.eduTypeId);
        formData.append("eduDetailsId", createEduReq?.eduDetailsId);
        formData.append("endDate", createEduReq.endDate);
        formData.append("startDate", createEduReq.startDate);
        formData.append("fieldOfStudy", createEduReq.fieldOfStudy);
        formData.append("grade", createEduReq.grade);
        formData.append("instituteName", createEduReq.instituteName);
        formData.append("qualification", createEduReq.qualification);
        formData.append("attachmentPath", createEduReq.attachmentPath);
        formData.append("attachment", createEduReq.attachment);
        console.log("🚀 ~ file: api.js:49 ~ formData:", formData);
        return {
          url: `/application/addEduDetails`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["AppEduDetails"],
    }),
    deleteEduDetails: builder.mutation({
      query: ({ detailId }) => ({
        url: `/application/deleteEduDetails/?eduId=${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppEduDetails"],
    }),
    createAppExpDetails: builder.mutation({
      query: (createExpReq) => {
        const formData = new FormData();
      },
    }),
  }),
});

export const {
  useGetVacanciesQuery,
  useGetVacancyBySearchQuery,
  useCreateAppBasicDetailsMutation,
  useGetAppBasicDetailsQuery,
  useGetAppEduDetailsQuery,
  useCreateAppEduDetailsMutation,
  useDeleteEduDetailsMutation,
} = api;
