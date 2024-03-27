import { createSlice } from "@reduxjs/toolkit"


const initialState =
{
    loginEmail_Number: "",
    loginPassword: "",
}

const loginSlice = createSlice({

    name: "userLogin",
    initialState,
    reducers:
    {
        setLoginEmailNumber: (state, action) => {
            state.loginEmail_Number = action.payload.loginEmail_Number;
        },
        setLoginPassword: (state, action) => {
            state.loginPassword = action.payload.loginPassword;
        },
    },

})



export const {
    setLoginEmailNumber,
    setLoginPassword,
} = loginSlice.actions;


export const selectLoginEmailNumber = (state) => state.userLogin.loginEmail_Number;
export const selectLoginPassword = (state) => state.userLogin.loginPassword;

export default loginSlice.reducer;