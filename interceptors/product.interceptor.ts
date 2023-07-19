import { HIDRA_SERVER_URL } from "@config/index";
import { IProduct, IProductListResponse } from "@interfaces/IProduct";
import axios, { AxiosResponse } from "axios";
import Product from "models/product";

const instance = axios.create({
    baseURL: `${HIDRA_SERVER_URL}/api/store/products/`,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getProducts = async (page=1) => {
    const response: AxiosResponse<IProductListResponse> = await instance.get(`?page=${page}`);
    const {count, next, previous} = response.data;
    return {
        count,
        next,
        previous,
        products: response.data.results
    }
}