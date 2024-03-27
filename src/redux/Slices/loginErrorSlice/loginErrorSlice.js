import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailError: true,
  passwordError: true,
};
const slice = createSlice({
  name: "loginErrorSlice",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.emailError = action.payload;
    },
    setPassword(state, action) {
      state.passwordError = action.payload;
    },
  }
});

export const loginErrorSlice = slice.reducer;
export const loginErrorActions = slice.actions;