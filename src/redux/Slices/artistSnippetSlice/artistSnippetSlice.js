import { createSlice } from "@reduxjs/toolkit"


const initialState =
{
    first_name: "",
    last_name:"",
    profile_picture:"",
    level:"",
    bio: "",
    total_designs:"",
    followers:"",
    views:"",
    member_since:"",
}

const artistSnippetSlice = createSlice({

    name: "artistSnippet",
    initialState,
    reducers:
    {
        setFirstName: (state, action) => {
            state.first_name = action.payload.first_name;
        },
        setLastName: (state, action) => {
            state.last_name = action.payload.last_name;
        },
        setProfilePicture: (state, action) => {
            state.profile_picture = action.payload.profile_picture;
        },
        setLevel: (state, action) => {
            state.level = action.payload.level;
        },
        setBio: (state, action) => {
            state.bio = action.payload.bio;
        },
        setTotalDesigns: (state, action) => {
            state.total_designs = action.payload.total_designs;
        },
        setFollowers: (state, action) => {
            state.followers = action.payload.followers;
        },
        setViews: (state, action) => {
            state.views = action.payload.views;
        },
        setMemberSince: (state, action) => {
            state.member_since = action.payload.member_since;
        },

    },

})



export const {
  setFirstName,
  setLastName,
  setProfilePicture,
  setLevel,
  setBio,
  setTotalDesigns,
  setFollowers,
  setViews,
  setMemberSince,
} = artistSnippetSlice.actions;


export const selectFirstName= (state) => state.artistSnippet.first_name;
export const selectLastName= (state) => state.artistSnippet.last_name;
export const selectProfilePicture= (state) => state.artistSnippet.profile_picture;
export const selectLevel= (state) => state.artistSnippet.level;
export const selectBio= (state) => state.artistSnippet.bio;
export const selectTotalDesigns= (state) => state.artistSnippet.total_designs;
export const selectFollowers= (state) => state.artistSnippet.followers;
export const selectViews= (state) => state.artistSnippet.views;
export const selectMemberSince= (state) => state.artistSnippet.member_since;


export default artistSnippetSlice.reducer;