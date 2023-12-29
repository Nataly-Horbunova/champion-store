import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getProduct, getProducts} from "../../../core/api";

const initialState = {
    products: [],
    productsPerPage: [],
    loading: false,
    error: null
}

export const fetchAllProducts = createAsyncThunk('shop/fetchAllProducts',
    async ({category, subcategory, searchParamsStr}, {rejectWithValue}) => {
        try {
            const products = await getProducts(category, subcategory, searchParamsStr);
            const favoritesFromStorage = JSON.parse(localStorage.getItem('favourites')) || [];
            const markedProducts = products.map(product => ({...product, isFavourite: favoritesFromStorage.includes(product.id)}));
            return markedProducts;

        } catch (error) {
            if (error.response) {
                return rejectWithValue({
                    message: error.message,
                    responseStatus: error.response.status,
                });
            }
            throw error;
        }
    });

export const fetchProductsPerPage = createAsyncThunk('shop/fetchProductsPerPage',
    async ({category, subcategory, searchParamsStr, pageNumber}, {rejectWithValue}) => {
        try {
            const products = await getProducts(category, subcategory, searchParamsStr);
            const favoritesFromStorage = JSON.parse(localStorage.getItem('favourites')) || [];
            const markedProducts = products.map(product => ({...product, isFavourite: favoritesFromStorage.includes(product.id)}));

            return markedProducts;
        } catch (error) {
            if (error.response) {
                return rejectWithValue({
                    message: error.message,
                    responseStatus: error.response.status,
                });
            }
            throw error;
        }
    });


export const fetchProductById = createAsyncThunk('shop/fetchProductById',
    async (id, {rejectWithValue}) => {
        try {
            const product = await getProduct(id);
            const favoritesFromStorage = JSON.parse(localStorage.getItem('favourites')) || [];
            const markedProduct = {...product, isFavourite: favoritesFromStorage.includes(product.id)};

            return markedProduct;
        } catch (error) {
            if (error.response) {
                return rejectWithValue({
                    message: error.message,
                    responseStatus: error.response.status,
                });
            }
            throw error;
        }
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
                state.error = {
                    message: action.payload.message,
                    responseStatus: action.payload.responseStatus,
                };
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
                state.error = {
                    message: action.payload.message,
                    responseStatus: action.payload.responseStatus,
                };
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = {
                    message:  action.payload.message,
                    responseStatus: action.payload.responseStatus,
                };
            })
    }
})

export default shopSlice.reducer;