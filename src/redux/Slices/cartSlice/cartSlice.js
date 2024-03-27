import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: "",
};

const cartSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload.cart;
    },
  },
});

export const { setFirstName } = cartSlice.actions;

export const cart = (state) => state.cartDetails.cart;

export default cartSlice.reducer;
