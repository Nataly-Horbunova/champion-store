import data from './data.json';

export const getHeaderData = () => data.header;
export const getFooterData = () => data.footer;
export const getMainPageData = () => data.mainPage;
export const getCarouselData = () => data.mainPage.carousel;
export const getFiltersData = () => data.products.filters;
export const getSortData = () => data.products.sort;
export const getProductCardData = () => data.products.cardInfo;
export const getSubCategoriesData = () => data.header.dropDown.subcategories;
export const getCategoriesData = () => data.header.dropDown.categories;
export const getCartData = () => data.cart;
export const getFavouritesData = () => data.favourites;

