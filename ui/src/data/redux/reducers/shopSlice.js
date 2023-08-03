import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getProduct, getProducts} from "../../../core/api";

const initialState = {
    products: [],
    productsPerPage: [],
    loading: true,
    error: null
}

export const fetchAllProducts = createAsyncThunk('shop/fetchAllProducts', async ({ category, subcategory, searchParamsStr }) => {
    return await getProducts(category, subcategory, searchParamsStr);
});

export const fetchProductsPerPage = createAsyncThunk('shop/fetchProductsPerPage', async ({ category, subcategory, searchParamsStr, pageNumber }) => {
    return await getProducts(category, subcategory, searchParamsStr, pageNumber);
});

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductsPerPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsPerPage.fulfilled, (state, action) => {
                state.loading = false;
                state.productsPerPage = action.payload;
            })
            .addCase(fetchProductsPerPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default shopSlice.reducer;