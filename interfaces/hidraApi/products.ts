import { Product } from "@interfaces/IProduct";


export interface ApiProductsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
}