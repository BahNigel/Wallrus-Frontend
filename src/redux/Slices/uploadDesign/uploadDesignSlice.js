import { createSlice } from "@reduxjs/toolkit"


const initialState =
{
    app_list: "",
    tag_list:"",
    colorway_name:[],
    tag_colour:[],
    link:[],
    counter:""

}

const uploadDesignSlice = createSlice({

    name: "uploadDesign",
    initialState,
    reducers:
    {
        setAppList: (state, action) => {
            state.app_list = action.payload.app_list;
        },
        setTagList: (state, action) => {
            state.tag_list = action.payload.tag_list;
        },
        setColorwayName: (state, action) => {
            state.colorway_name[state.counter] = action.payload.colorway_name;
        },
        setTagColour: (state, action) => {
            state.tag_colour[state.counter] = action.payload.tag_colour;
        },
        setLink: (state, action) => {
            state.link[state.counter] = action.payload.link;
        },
        setCounter: (state, action) => {
            state.counter = action.payload.counter;
        },
    },
})



export const {
    setAppList,
    setTagList,
    setColorwayName,
    setLink,
    setTagColour,
    setCounter

} = uploadDesignSlice.actions;

export const selectAppList = (state) => state.uploadDesign.app_list;
export const selectTagList = (state) => state.uploadDesign.tag_list;
export const selectColorwayName = (state) => state.uploadDesign.colorway_name;
export const selectLink = (state) => state.uploadDesign.link;
export const selectTagColour = (state) => state.uploadDesign.tag_colour;

export default uploadDesignSlice.reducer;