import { createSlice } from "@reduxjs/toolkit"

const initialState = 
{
    follower_frequency : '',
    payments_frequency : '',
    designs_view_frequency : '',
    favourite_frequency : '',
    purchase_frequency : '',

}


const NotificationSettingSlice = createSlice({
    name: "NotificationsSettings",
    initialState,
    reducers: {
        setNewFollowerNotification : (state, action) => {
            state.follower_frequency = action.payload.follower_frequency;
        },
        setPaymentsNotification : (state, action) => {
            state.payments_frequency = action.payload.payments_frequency;
        },
        setDesignsViewNotification : (state, action) => {
            state.designs_view_frequency = action.payload.designs_view_frequency;
        },
        setFavouriteNotification : (state, action) => {
            state.favourite_frequency = action.payload.favourite_frequency;
        },
        setPurchaseNotification : (state, action) => {
            state.purchase_frequency = action.payload.purchase_frequency;
        },
        
    }
})


export const {
    setNewFollowerNotification,
    setPurchaseNotification,
    setPaymentsNotification,
    setFavouriteNotification,
    setDesignsViewNotification,
} = NotificationSettingSlice.actions


export const selectFollowersFrequency= (state) => state.NotificationsSettings.follower_frequency;
export const selectPaymentsFrequency= (state) => state.NotificationsSettings.payments_frequency;
export const selectPurchaseFrequency= (state) => state.NotificationsSettings.purchase_frequency;
export const selectFavouriteFrequency= (state) => state.NotificationsSettings.favourite_frequency;
export const selectDesignView= (state) => state.NotificationsSettings.designs_view_frequency;




export default NotificationSettingSlice.reducer;