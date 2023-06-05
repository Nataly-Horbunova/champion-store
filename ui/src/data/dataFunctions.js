import data from './data.json';

export const getHeaderData = () => data.header;
export const getFooterData = () => data.footer;
export const getMainPageData = () => data.mainPage;
export const getCarouselData = () => data.mainPage.carousel;
export const getFiltersData = () => data.products.filters;

