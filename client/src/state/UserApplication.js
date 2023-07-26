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
    otherAchievements: [],
    attachments: [],
  },
  reducers: {
    setEducationQulifications(state, action) {
      state.eduQualification = [...state.eduQualification, action.payload];
    },
    setProfessionalQulifications(state, action) {
      state.experience = [...state.experience, action.payload];
    },
  },
});

export const { setEducationQulifications, setProfessionalQulifications } =
  userApplication.actions;
export default userApplication.reducer;
