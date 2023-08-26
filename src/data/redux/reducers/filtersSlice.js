import {createSlice} from "@reduxjs/toolkit";
import {
    getAvailabilityCount,
    getCategoriesCount,
    getCategoryColors,
    getColorsCount
} from "../../../core/utils";

export const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        category: "",
        subcategory: "",
        searchParamsStr: "",
        pageNumber: 1,
        searchValue: '',

        minPrice: 0,
        maxPrice: 0,
        priceRange: [0, 0],

        colorsCount: {},
        availabilityCount: {},
        categoriesCount: {},

        categoryColors: [],

        colorFilter: [],
        availabilityFilter: [],
        categoriesFilter: [],
        priceFilter: [],
        sortValue: ""
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },

        setSubcategory: (state, action) => {
            state.subcategory = action.payload;
        },

        setSearchParamsStr: (state, action) => {
            state.searchParamsStr = action.payload;
        },

        setPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        },

        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },

        setMinPrice: (state, action) => {
            state.minPrice = action.payload;
        },

        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload;
        },

        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },

        setColorsCount: (state, action) => {
            const products = action.payload;
            if (products) {
                state.colorsCount = getColorsCount(action.payload);
            }
        },

        setCategoriesCount: (state, action) => {
            const products = action.payload;
            if (products) {
                state.categoriesCount = getCategoriesCount(action.payload);
            }
        },

        setAvailabilityCount: (state, action) => {
            const products = action.payload;
            if (products) {
                state.availabilityCount = getAvailabilityCount(action.payload);
            }
        },

        setCategoryColors: (state, action) => {
            const products = action.payload;
            if (products) {
                state.categoryColors = getCategoryColors(action.payload);
            }
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
            state.priceFilter = action.payload;
        },

        removePriceFilter: (state, action) => {
            state.priceFilter = [];
        },

        clearAllFilters: (state, action) => {
            state.colorFilter = [];
            state.categoriesFilter = [];
            state.availabilityFilter = [];
            state.priceFilter = [];
            state.priceRange = [state.minPrice, state.maxPrice];
        },

        setSortValue: (state, action) => {
            state.sortValue = action.payload;
        }
    }
});

export const {
    setCategory,
    setSubcategory,
    setSearchParamsStr,
    setPageNumber,
    setSearchValue,
    setMinPrice,
    setMaxPrice,
    setPriceRange,
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
    setSortValue
} = filtersSlice.actions;

export default filtersSlice.reducer;