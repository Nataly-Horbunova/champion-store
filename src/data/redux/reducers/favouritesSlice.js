import {createSlice} from '@reduxjs/toolkit';
// import {v4 as uuidv4} from "uuid";

const initialState = {
    favouritesProducts: JSON.parse(localStorage.getItem('favourites')) || []
}

export const favouritesSlice = createSlice( {
    name: 'favourites',
    initialState,
    
    reducers: {
        addToFavourites: (state, action) => {
            const isPresent = state.favouritesProducts.find( item => action.payload.id === item.id);
            
            if(!isPresent ) {
                state.favouritesProducts.push(action.payload);
                localStorage.setItem('favourites', state.favouritesProducts);
            }
        },

        removeFromFavourites: (state, action) => {
            state.favouritesProducts.filter(item => item.id !== action.payload);
            localStorage.setItem('favourites', state.favouritesProducts);
        }
    }
})

export const {addToFavourites, removeFromFavourites, clearFavuorites} = favouritesSlice.actions;

export default favouritesSlice.reducer;