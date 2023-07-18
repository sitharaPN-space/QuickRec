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
});

export default userApplication.reducer;
