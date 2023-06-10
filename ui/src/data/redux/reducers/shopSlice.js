import {createSlice} from '@reduxjs/toolkit'

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        products: []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },


    }
})

export const {setProducts} = shopSlice.actions;

export default shopSlice.reducer;