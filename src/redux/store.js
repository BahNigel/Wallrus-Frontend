import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import { persistReducer } from 'redux-persist';
import userSignupSlice from "./Slices/userSignUpSlice/userSignUpSlice";
import loginSlice from "./Slices/loginSlice/loginSlice";
import artistSnippetSlice from "./Slices/artistSnippetSlice/artistSnippetSlice";
import cartSlice from "./Slices/cartSlice/cartSlice";
import NotificationSettingSlice from "./Slices/NotificationSettingSlice/NotificationSettingSlice";
import uploadDesignSlice from "./Slices/uploadDesign/uploadDesignSlice";
import changePasswordSlice from "./Slices/changePasswordSlice/changePasswordSlice";
import { loginErrorSlice } from "./Slices/loginErrorSlice/loginErrorSlice";
import { userDetailReducer } from "./Slices/userSnippet/userSnippet";

export default configureStore({
  reducer: {
    userSignup: userSignupSlice,
    userLogin: loginSlice,
    artistSnippet: artistSnippetSlice,
    cartSlice: cartSlice,
    NotificationsSettings: NotificationSettingSlice,
    uploadDesign: uploadDesignSlice,
    changePassword: changePasswordSlice,
    loginError: loginErrorSlice,
    userDetails: userDetailReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
