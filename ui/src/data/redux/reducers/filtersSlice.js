import {createSlice} from "@reduxjs/toolkit";
import {getAvailabilityCount, getCategoriesCount, getCategoryColors, getColorsCount} from "../../../core/utils";

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

        categoryColors: [],

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

        setCategoryColors: (state, action) => {
            state.categoryColors = getCategoryColors(action.payload);
        },

        setColorFilter: (state, action) => {
            state.colorFilter.push(action.payload);
        },

        removeColorFilter: (state, action) => {
            state.colorFilter = state.colorFilter.filter(item => item.value !== action.payload.value);
        },

        setCategoriesFilter: (state, action) => {
            state.categoriesFilter.push(action.payload);
        },

        removeCategoriesFilter: (state, action) => {
            state.categoriesFilter = state.categoriesFilter.filter(item => item !== action.payload);
        },

        setAvailabilityFilter: (state, action) => {
            state.availabilityFilter.push(action.payload);
        },

        removeAvailabilityFilter: (state, action) => {
            state.availabilityFilter = state.availabilityFilter.filter(item => item.value !== action.payload.value);
        },

        setPriceFilter: (state, action) => {
            state.priceFilter.push(action.payload);
        },

        removePriceFilter: (state, action) => {
            //
        },

        clearAllFilters: (state, action) => {
            state.colorFilter = [];
            state.categoriesFilter = [];
            state.availabilityFilter = [];
            state.priceFilter = [];
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
    setCategoryColors,
    setColorFilter,
    setCategoriesFilter,
    setAvailabilityFilter,
    removeColorFilter,
    removeCategoriesFilter,
    removeAvailabilityFilter,
    removePriceFilter,
    setPriceFilter,
    clearAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;