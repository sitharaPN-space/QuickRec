import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";

const token = localStorage.getItem("profile");
let decodedData;
try {
  let currentDate = new Date();
  
  const decodedToken = await jwt(token);
  console.log(decodedToken.exp * 1000 , currentDate.getTime())
  if (decodedToken.exp * 1000 > currentDate.getTime()) {
    decodedData = decodedToken;
  } else {
    decodedData = null;
  }
} catch {
  decodedData = null;
}

const userSlice = createSlice({
  name: "userContext",
  initialState: {
    data: { result: decodedData, token: token },
    error: null,
  },
  reducers: {
    getUserDataOnSuccess(state, action) {
      state.data = action.payload;
      state.error = null;
    },
    getUserDataOnFailiure(state, action) {
      state.error = action.payload;
    },
    logOut(state, action) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { getUserDataOnFailiure, getUserDataOnSuccess, logOut } =
  userSlice.actions;
export default userSlice.reducer;
