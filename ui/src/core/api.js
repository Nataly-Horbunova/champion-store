import axios from "axios";

const baseUrl = 'http://localhost:3001/';
const productsUrl = "products/";
const categoriesUrl = '?categories_like=';
const subcategoriesUrl = '?subcategories';
const pageUrl = '_page=';
const limitUrl = '_limit=';
export const searchUrl = 'name_like='
export const limitCount = 16;


export const getProducts = (category, subcategory, searchParams, pageNumber = "") => {
    let requestUrl;
    const paginationParam = pageNumber ? `${pageUrl}${pageNumber}&${limitUrl}${limitCount}` : "";


    if (category) {
        requestUrl = `${baseUrl}${productsUrl}${categoriesUrl}${category}&${searchParams}&${paginationParam}`;
    } else if (subcategory) {
        requestUrl = `${baseUrl}${productsUrl}${subcategoriesUrl}.${subcategory}=true&${searchParams}&${paginationParam}`;
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

