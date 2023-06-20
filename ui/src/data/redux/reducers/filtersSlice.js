import {createSlice} from "@reduxjs/toolkit";
import {getAvailabilityCount, getCategoriesCount, getColorsCount} from "../../../functions";

export const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        filteredProducts: [],

        colorsCount: {},
        availabilityCount: {},
        categoriesCount: {},

        colorFilter: [],
        availabilityFilter: [],
        categoriesFilter: [],
        priceFilter: {}
    },
    reducers: {
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        },

        setColorsCount: (state, action) => {
            state.colorsCount = getColorsCount(action.payload);
        },

        setCategoriesCount: (state, action) => {
            state.categoriesCount = getCategoriesCount(action.payload);
        },

        setAvailabilityCount: (state, action) => {
            state.availabilityCount = getAvailabilityCount(action.payload);
        },

        setColorFilter: (state, action) => {
            state.colorFilter = action.payload;
        },

        setCategoriesFilter: (state, action) => {
            state.categoriesFilter = action.payload;
        },

        setAvailabilityFilter: (state, action) => {
            state.availabilityFilter = action.payload;
        },

        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload;
        }

    }
});

export const {
    setFilteredProducts,
    setColorsCount,
    setCategoriesCount,
    setAvailabilityCount,
    setColorFilter,
    setCategoriesFilter,
    setAvailabilityFilter,
    setPriceFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;