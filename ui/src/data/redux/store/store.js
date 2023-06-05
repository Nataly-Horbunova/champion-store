import { configureStore } from '@reduxjs/toolkit'
import shopSlice from "../reducers/shopSlice";

export const store = configureStore({
    reducer: {
        shop: shopSlice,
    }
})