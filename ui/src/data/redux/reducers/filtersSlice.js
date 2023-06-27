import {createSlice} from "@reduxjs/toolkit";
import {getAvailabilityCount, getCategoriesCount, getColorsCount} from "../../../functions";

export const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        filteredProducts: [],
        category: "",
        subcategory: "",
        searchParamsStr: "",

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

        setCategory: (state, action) => {
            state.category = action.payload;
        },

        setSubcategory: (state, action) => {
            state.subcategory = action.payload;
        },

        setSearchParamsStr: (state, action) => {
            state.searchParamsStr = action.payload;
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
    setCategory,
    setSubcategory,
    setSearchParamsStr,
    setColorsCount,
    setCategoriesCount,
    setAvailabilityCount,
    setColorFilter,
    setCategoriesFilter,
    setAvailabilityFilter,
    setPriceFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;