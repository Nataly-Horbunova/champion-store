import axios from "axios";

const baseUrl = 'http://localhost:3001/';
const productsUrl = "products/";
const categoriesUrl = '?categories_like=';
const subcategoriesUrl = '?subcategories'


export const getProducts = (category, subcategory, searchParams) => {
    let requestUrl;

    if (category) {
        requestUrl = `${baseUrl}${productsUrl}${categoriesUrl}${category}&${searchParams}`;
    } else if (subcategory) {
        requestUrl = `${baseUrl}${productsUrl}${subcategoriesUrl}.${subcategory}=true&${searchParams}`;
    }
    else if (!category && !subcategory) {
        requestUrl = `${baseUrl}${productsUrl}?${searchParams}`;
    }

    return axios
        .get(requestUrl)
        .then(response => response.data);
}

export const getProduct = (id) => {
    return axios
        .get(`${baseUrl}${productsUrl}${id}`)
        .then(response => response.data);
}

