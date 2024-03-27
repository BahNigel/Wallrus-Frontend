import { createSlice } from "@reduxjs/toolkit"


const initialState =
{
    account_type: "",
    email_Number: "",
    password: "",
    profilePic: "",
    fullName: "",
    userName: "",
    email_aboutyou: "",
    phoneNumber_aboutyou: "",
    address_street_aboutyou: "",
    address_apartment_aboutyou: "",
    state_aboutyou: "",
    city_aboutyou: "",
    pincode_aboutyou: "",
    bio: "",
    organization: "",
    pan: "",
    gst: "",
    email_business: "",
    phoneNumber_business: "",
    address_street_business: "",
    address_apartment_business: "",
    state_business: "",
    city_business: "",
    pincode: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    bankBranch: "",
    swiftCode: "",
    tab: ""
}

const userSignupSlice = createSlice({

    name: "userSignup",
    initialState,
    reducers:
    {
        setAccountType: (state, action) => {
            state.account_type = action.payload.account_type;
        },
        setEmailNumber: (state, action) => {
            state.email_Number = action.payload.email_Number;
        },
        setPassword: (state, action) => {
            state.password = action.payload.password;
        },
        setProfilePic: (state, action) => {
            state.profilePic = action.payload.profilePic;
        },
        setFullName: (state, action) => {
            state.fullName = action.payload.fullName;
        },
        setUserName: (state, action) => {
            state.userName = action.payload.userName;
        },
        setEmail_AboutYou: (state, action) => {
            state.email_aboutyou = action.payload.email_aboutyou;
        },
        setPhoneNumber_AboutYou: (state, action) => {
            state.phoneNumber_aboutyou = action.payload.phoneNumber_aboutyou;
        },
        setAddress_Street_AboutYou: (state, action) => {
            state.address_street_aboutyou = action.payload.address_street_aboutyou;
        },
        setAddress_Apartment_AboutYou: (state, action) => {
            state.address_apartment_aboutyou = action.payload.address_apartment_aboutyou;
        },
        setState_AboutYou: (state, action) => {
            state.state_aboutyou = action.payload.state_aboutyou;
        },
        setCity_AboutYou: (state, action) => {
            state.city_aboutyou = action.payload.city_aboutyou;
        },
        setPincode_AboutYou: (state, action) => {
            state.pincode_aboutyou = action.payload.pincode_aboutyou;
        },
        setBio: (state, action) => {
            state.bio = action.payload.bio;
        },
        setOrganization: (state, action) => {
            state.organization = action.payload.organization;
        },
        setPan: (state, action) => {
            state.pan = action.payload.pan;
        },
        setGst: (state, action) => {
            state.gst = action.payload.gst;
        },
        setEmail_Business: (state, action) => {
            state.email_business = action.payload.email_business;
        },
        setPhoneNumber_Business: (state, action) => {
            state.phoneNumber_business = action.payload.phoneNumber_business;
        },
        setAddress_Street_Business: (state, action) => {
            state.address_street_business = action.payload.address_street_business;
        },
        setAddress_Apartment_Business: (state, action) => {
            state.address_apartment_business = action.payload.address_apartment_business;
        },
        setState_Business: (state, action) => {
            state.state_business = action.payload.state_business;
        },
        setCity_Business: (state, action) => {
            state.city_business = action.payload.city_business;
        },
        setPincode: (state, action) => {
            state.pincode = action.payload.pincode;
        },
        setAccountNumber: (state, action) => {
            state.accountNumber = action.payload.accountNumber;
        },
        setIFSCCode: (state, action) => {
            state.ifscCode = action.payload.ifscCode;
        },
        setBankName: (state, action) => {
            state.bankName = action.payload.bankName;
        },
        setBankBranch: (state, action) => {
            state.bankBranch = action.payload.bankBranch;
        },
        setSwiftCode: (state, action) => {
            state.swiftCode = action.payload.swiftCode;
        },
        setGoogleEmail: (state, action) => {
            state.email_aboutyou = action.payload.email_aboutyou;
        },
        setGoogleFullName: (state, action) => {
            state.fullName = action.payload.fullName;
        },
        setTab: (state, action) => {
            state.tab = action.payload.tab;
        },
    },

})



export const {
    setAccountType,
    setEmailNumber,
    setPassword,
    setProfilePic,
    setFullName,
    setUserName,
    setEmail_AboutYou,
    setPhoneNumber_AboutYou,
    setAddress_Street_AboutYou,
    setAddress_Apartment_AboutYou,
    setState_AboutYou,
    setCity_AboutYou,
    setPincode_AboutYou,
    setBio,
    setOrganization,
    setPan,
    setGst,
    setEmail_Business,
    setPhoneNumber_Business,
    setAddress_Street_Business,
    setAddress_Apartment_Business,
    setState_Business,
    setCity_Business,
    setPincode,
    setAccountNumber,
    setIFSCCode,
    setBankName,
    setBankBranch,
    setSwiftCode,
    setGoogleEmail,
    setGoogleFullName,
    setTab
} = userSignupSlice.actions;

export const selectAccountType = (state) => state.userSignup.account_type;


export const selectEmailNumber = (state) => state.userSignup.email_Number;
export const selectPassword = (state) => state.userSignup.password;

export const selectProfilePic = (state) => state.userSignup.profilePic;
export const selectFullName = (state) => state.userSignup.fullName;
export const selectUserName = (state) => state.userSignup.userName;
export const selectEmail_AboutYou = (state) => state.userSignup.email_aboutyou;
export const selectPhoneNumber_AboutYou = (state) => state.userSignup.phoneNumber_aboutyou;
export const selectBio = (state) => state.userSignup.bio;
export const selectAddress_Street_AboutYou = (state) => state.userSignup.address_street_aboutyou;
export const selectAddress_Apartment_AboutYou = (state) => state.userSignup.address_apartment_aboutyou;
export const selectState_AboutYou = (state) => state.userSignup.state_aboutyou;
export const selectCity_AboutYou = (state) => state.userSignup.city_aboutyou;
export const selectPincode_AboutYou = (state) => state.userSignup.pincode_aboutyou;


export const selectOrganization = (state) => state.userSignup.organization;
export const selectPan = (state) => state.userSignup.pan;
export const selectGst = (state) => state.userSignup.gst;
export const selectEmail_Business = (state) => state.userSignup.email_business;
export const selectPhoneNumber_Business = (state) => state.userSignup.phoneNumber_business;
export const selectAddress_Street_Business = (state) => state.userSignup.address_street_business;
export const selectAddress_Apartment_Business = (state) => state.userSignup.address_apartment_business;
export const selectState_Business = (state) => state.userSignup.state_business;
export const selectCity_Business = (state) => state.userSignup.city_business;
export const selectPincode = (state) => state.userSignup.pincode;


export const selectAccountNumber = (state) => state.userSignup.accountNumber;
export const selectIFSCCode = (state) => state.userSignup.ifscCode;
export const selectBankName = (state) => state.userSignup.bankName;
export const selectBankBranch = (state) => state.userSignup.bankBranch;
export const selectSwiftCode = (state) => state.userSignup.swiftCode;
export const selectGoogleEmail = (state) => state.userSignup.googleEmail;
export const selectGoogleFullName = (state) => state.userSignup.googleFullName;
export const selectGoogleProfilePic = (state) => state.userSignup.googleProfilePic;

export const selectTab = (state) => state.userSignup.tab;

export default userSignupSlice.reducer;