import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    favouritesProducts: JSON.parse(localStorage.getItem('favourites')) || []
}

export const favouritesSlice = createSlice( {
    name: 'favourites',
    initialState,
    
    reducers: {
        addToFavourites: (state, action) => {
            const { id } = action.payload;

            if (!state.favouritesProducts.includes(id)) {
              state.favouritesProducts.push(id);
              localStorage.setItem('favourites', JSON.stringify(state.favouritesProducts));
            }

            // const isPresent = state.favouritesProducts.find( item => action.payload.id === item.id);
            
            // if(!isPresent ) {
            //     state.favouritesProducts.push(action.payload);
            //     localStorage.setItem('favourites', JSON.stringify(state.favouritesProducts));
            // }
        },

        removeFromFavourites: (state, action) => {
            const { id } = action.payload;
            state.favouritesProducts = state.favouritesProducts.filter(itemId => itemId !== id);
            localStorage.setItem('favourites', JSON.stringify(state.favouritesProducts));

            // state.favouritesProducts.filter(item => item.id !== action.payload);
            // localStorage.setItem('favourites', JSON.stringify(state.favouritesProducts));
        }
    }
})

export const {addToFavourites, removeFromFavourites, clearFavuorites} = favouritesSlice.actions;

export default favouritesSlice.reducer;