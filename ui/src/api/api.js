import axios from "axios";

const baseUrl = 'http://localhost:3001/';
const productsUrl = "products/";


export const getProducts = (category) => {
    return axios
        .get(baseUrl + productsUrl + category)
        .then(response => response.data);
}

