import { ApiProductsResponse } from "@interfaces/hidraApi/products";
import { InitFiltersProps } from "./contracts";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const fetcher = async (
    url: string, 
    method: Method = 'GET', 
    body: InitFiltersProps | undefined = undefined
): Promise<ApiProductsResponse> => {
    
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body? JSON.stringify(body) : undefined,
    });
    
    const data = await response.json();

    if (!response.ok) throw new Error("Error al cargar productos");
    return data;
}

export default fetcher;