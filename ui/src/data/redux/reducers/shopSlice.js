import {createSlice} from '@reduxjs/toolkit'

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        products: [],
        productPerPage: []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProductsPerPage: (state, action) => {
            state.productPerPage = action.payload;
        }
    }
})

export const {setProducts, setProductsPerPage} = shopSlice.actions;

export default shopSlice.reducer;