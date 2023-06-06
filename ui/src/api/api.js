import axios from "axios";

const baseUrl = 'http://localhost:3001/';
const productsUrl = "products/";


export const getProducts = (category) => {
    return axios
        .get(baseUrl + productsUrl + category)
        .then(response => response.data);
}

export const getProduct = (id) => {
    return axios
        .get(baseUrl + productsUrl + id)
        .then(response => response.data);
}

