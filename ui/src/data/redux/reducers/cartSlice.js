import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from "uuid";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartProducts: [],
        orderPlaced: false
    },
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
    }
})

export const {addToCart, removeFromCart, changeCount, clearCart, setOrderPlaced} = cartSlice.actions;

export default cartSlice.reducer;
