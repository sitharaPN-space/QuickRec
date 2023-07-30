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
      dateOfBirth: null,
      sex: "",
      civilStatus: "",
      AddressLine1: "",
      AddressLine2: "",
      nationality: "",
      religion: "",
      ethnicity: "",
      mobileNo1: "",
      mobileNo2: "",
      email: "",
    },
    eduQualification: [],
    experience: [],
    otherAchievements: [],
    attachments: {
      cv: {
        name: "Choose File",
      },
      nic: {
        name: "Choose File",
      },
      birthCertificate: {
        name: "Choose File",
      },
    },
  },
  reducers: {
    setApplicationData(state, action) {
      const [[key, value]] = Object.entries(action.payload);
      state[key] = value;
    },
  },
});

export const { setApplicationData } = userApplication.actions;

export default userApplication.reducer;
