import { createSlice } from "@reduxjs/toolkit"


const initialState =
{
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
}

const changePasswordSlice = createSlice({

    name: "changePassword",
    initialState,
    reducers:
    {
        setOldPassword: (state, action) => {
            state.oldPassword = action.payload.oldPassword;
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload.newPassword;
        },
        setConfirmNewPassword: (state, action) => {
            state.confirmNewPassword = action.payload.confirmNewPassword;
        },
    },

})



export const {
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword
} = changePasswordSlice.actions;


export const selectOldPassword = (state) => state.changePassword.oldPassword;
export const selectNewPassword = (state) => state.changePassword.newPassword;
export const selectConfirmNewPassword = (state) => state.changePassword.confirmNewPassword;


export default changePasswordSlice.reducer;