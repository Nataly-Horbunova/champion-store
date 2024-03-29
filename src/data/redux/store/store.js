import {configureStore} from '@reduxjs/toolkit'
import shopSlice from "../reducers/shopSlice";
import cartSlice from "../reducers/cartSlice";
import favouritesSlice from "../reducers/favouritesSlice";
import filtersSlice from "../reducers/filtersSlice";

export const store = configureStore({
    reducer: {
        shop: shopSlice,
        cart: cartSlice,
        favourites: favouritesSlice,
        filters: filtersSlice,
    }
})