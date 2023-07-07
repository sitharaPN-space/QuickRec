import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
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
