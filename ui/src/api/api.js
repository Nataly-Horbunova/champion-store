import axios from "axios";

const baseUrl = 'http://localhost:3001/';
const productsUrl = "products/";
const categoriesFilter = '?categories_like=';


export const getProducts = (category, searchParams) => {
    let requestUrl;

    if (category) {
        requestUrl = `${baseUrl}${productsUrl}${categoriesFilter}${category}&${searchParams}`;
    } else {
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

