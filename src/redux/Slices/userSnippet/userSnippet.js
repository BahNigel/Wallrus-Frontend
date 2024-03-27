import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  profilePic: "",
  entryLevel: "",
  loader: true,
}

const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setDetails(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePic = action.payload.profilePic;
      state.entryLevel = action.payload.entryLevel;
    },
    setLoader(state, action) {
      state.loader = action.payload;
    }
  }
})

export const userDetailReducer = userDetails.reducer;
export const userDetailActions = userDetails.actions;