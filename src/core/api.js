import axios from "axios";

const api = axios.create({
    baseURL: "https://champion-store-server.onrender.com/",
  });

const urlParams = {
    productsUrl: "products/",
    ordersUrl: "orders",
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
    ordersUrl,
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
        requestUrl = `${productsUrl}?${categoriesUrl}=${category}&${searchParams}&${paginationParam}`;
    } else if (subcategory) {
        requestUrl = `${productsUrl}?${subcategoriesUrl}.${subcategory}=true&${searchParams}&${paginationParam}`;
    } else if (!category && !subcategory) {
        requestUrl = `${productsUrl}?${searchParams}${paginationParam}`;
    }

    return api
        .get(requestUrl)
        .then(response => response.data);
}

export const getProduct = (id) => {
    return api
        .get(`${productsUrl}${id}`)
        .then(response => response.data);
}

export const placeOrder= (order) => {
      const requestUrl = `${ordersUrl}`;
      const options = {
        headers: {
          'Content-Type': 'application/json', 
        }
      };

    return api
        .post(requestUrl, order, options)
        .then(response => response.data)
}