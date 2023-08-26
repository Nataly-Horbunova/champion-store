import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from "uuid";
import { placeOrder } from '../../../core/api';

const initialState ={
    cartProducts: [],
    orderPlaced: false,
    error: null
}

export const placeOrderAsync = createAsyncThunk('cart/placeOrderAsync', 
    async (order, {rejectWithValue}) => {
        try{        
            return await placeOrder(order);
        } catch(error) {
            if(error.response) {
                return rejectWithValue({
                    message: error.message,
                    responseStatus: error.response.status
                })
            }
            throw error;
        }
    })

export const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (state, action) => {
            let {product, count} = action.payload;

            const isProductPresent = state.cartProducts.find(item => {
                return (item.productId === product.id) && (item.currentImage.id === product.currentImage.id);
            });

            if (!isProductPresent) {
                state.cartProducts = [...state.cartProducts, {...product, count, productId: product.id, id: uuidv4()}]
            } else {
                state.cartProducts = state.cartProducts.map(item => {
                    return (item.productId === product.id) ? {...item, count: item.count + count} : item;
                })
            }
        },

        removeFromCart: (state, action) => {
            state.cartProducts = state.cartProducts.filter(item => (item.id !== action.payload));
        },

        changeCount: (state, action) => {
            let {product, count} = action.payload;

            state.cartProducts = state.cartProducts.map(item => {
                return (item.id === product.id) ? {...item, count} : item;
            })
        },

        clearCart: (state, action) => {
            state.cartProducts = [];
        },

        setOrderPlaced(state, action) {
            state.orderPlaced = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(placeOrderAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                state.orderPlaced = true;
            })
            .addCase(placeOrderAsync.rejected, (state, action) => {
                state.error = {
                    message: action.payload.message,
                    responseStatus: action.payload.responseStatus,
                };
            })

    }
})

export const {addToCart, removeFromCart, changeCount, clearCart, setOrderPlaced} = cartSlice.actions;

export default cartSlice.reducer;
