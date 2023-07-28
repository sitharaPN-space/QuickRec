import { createSlice } from "@reduxjs/toolkit";

const userApplication = createSlice({
  name: "userApplication",
  initialState: {
    basicDetails: {
      title: "",
      nameWithInitials: "",
      nameDenotedbyInit: "",
      otherName: "",
      nic: "",
      dateOfBirth: "",
    },
    eduQualification: [],
    experience: [],
    achievements: [],
    attachments: [],
  },
  reducers: {
    setEducationQulifications(state, action) {
      state.eduQualification = [...state.eduQualification, action.payload];
    },
    setProfessionalQulifications(state, action) {
      state.experience = [...state.experience, action.payload];
    },
    setAchievementsState(state, action) {
      state.achievements = [...state.achievements, action.payload];
    },
  },
});

export const {
  setEducationQulifications,
  setProfessionalQulifications,
  setAchievementsState,
} = userApplication.actions;
export default userApplication.reducer;
