import { HIDRA_SERVER_URL } from "@config/index";
import { ICategory, IProduct } from "@interfaces/IProduct";
import axios from "axios";
import { get } from "http";
import { CATEGORIES } from "models/categories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getStaticPaths = async () => {
    const paths = Object.values(CATEGORIES).map((category: ICategory) => (
    {params: { categoria: category.name }}
    ))
        console.log(paths);
        
    return {
        paths,
        fallback: false
    }
}



export interface CategoriaProductProps {
    products: IProduct[];
} 

const CategoriaProduct = ({products}: CategoriaProductProps) => {
    const router = useRouter();
    const {categoria} = router.query;
    console.log('front productos', products.length);
    
    useEffect(() => {
        
    const getProductos = async () => {
    let products: IProduct[] = [];
    try {
        console.log("dominio: ", HIDRA_SERVER_URL);
        
        const res = await axios.post('https://hidrasport.com.ar/api/store/products/filter/',
        {    
        "categories": ["Mujer"]
        },
        )
        const products = res.data.products;
        console.log(products);
    }catch(err) {
        // @ts-ignore
        console.table("error", err.message);
    }
    finally {
        console.log("productos: ", products.length)
        
    };
}
    getProductos().catch(err => console.log(err.message))
    },
[])

    return (

        <div>
            <h1>Productos de la categoria: {categoria}</h1>
            
        </div>
    );
}

export default CategoriaProduct;