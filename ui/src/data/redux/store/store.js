import { configureStore } from '@reduxjs/toolkit'
import shopSlice from "../reducers/shopSlice";
import cartSlice from "../reducers/cartSlice";

export const store = configureStore({
    reducer: {
        shop: shopSlice,
        cart: cartSlice
    }
})