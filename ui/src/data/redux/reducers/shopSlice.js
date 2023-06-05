import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    }
})

export const {setProducts} = shopSlice.actions;

export default shopSlice.reducer;