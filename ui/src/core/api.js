import axios from "axios";

const urlParams = {
    baseUrl: 'http://localhost:3001/',
    productsUrl: "products/",
    categoriesUrl: 'categories_like',
    subcategoriesUrl: 'subcategories',
    pageUrl: '_page',
    availabilityUrl: 'available',
    colorsUrl: 'colors_like',
    minPriceUrl: 'price_gte',
    maxPriceUrl: 'price_lte',
    sortUrl: '_sort',
    orderUrl: '_order',
    searchUrl: 'name_like',
    limitUrl: '_limit=',
    limitCount: 16,
}

export const {
    baseUrl,
    productsUrl,
    categoriesUrl,
    subcategoriesUrl,
    searchUrl,
    pageUrl,
    availabilityUrl,
    colorsUrl,
    minPriceUrl,
    maxPriceUrl,
    sortUrl,
    orderUrl,
    limitUrl,
    limitCount
} = urlParams;

export const getProducts = (category, subcategory, searchParams, pageNumber = "") => {
    let requestUrl;
    const paginationParam = pageNumber ? `${pageUrl}=${pageNumber}&${limitUrl}${limitCount}` : "";

    if (category) {
        requestUrl = `${baseUrl}${productsUrl}?${categoriesUrl}=${category}&${searchParams}&${paginationParam}`;
    } else if (subcategory) {
        requestUrl = `${baseUrl}${productsUrl}?${subcategoriesUrl}.${subcategory}=true&${searchParams}&${paginationParam}`;
    } else if (!category && !subcategory) {
        requestUrl = `${baseUrl}${productsUrl}?${searchParams}${paginationParam}`;
    }
    // console.log(requestUrl);
    return axios
        .get(requestUrl)
        .then(response => {
            return response.data;
        });
}

export const getProduct = (id) => {
    return axios
        .get(`${baseUrl}${productsUrl}${id}`)
        .then(response => response.data);
}

