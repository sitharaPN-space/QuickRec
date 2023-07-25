import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";

const token = localStorage.getItem("profile");
let decodedData;
try {
  decodedData = await jwt(token);
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
