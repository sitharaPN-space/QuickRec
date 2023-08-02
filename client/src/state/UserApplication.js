import { createSlice } from "@reduxjs/toolkit";

export const initState ={
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
  }

const userApplication = createSlice({
  name: "userApplication",
  initialState: initState,
  reducers: {
    setApplicationData(state, action) {
      const [[key, value]] = Object.entries(action.payload);
      state[key] = value;
    }
  },
});

export const { setApplicationData ,resetData } = userApplication.actions;

export default userApplication.reducer;
