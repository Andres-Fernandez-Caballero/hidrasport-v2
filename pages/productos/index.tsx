import Image from "next/image";
import { useRouter } from "next/router";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import { getProducts } from "@interceptors/product.interceptor";
import ProductCardItem from "@components/product/productCardItem";
import { useEffect } from "react";
import { IProduct, Product } from "@interfaces/IProduct";
import { HIDRA_SERVER_URL } from "@config/index";
import axios from "axios";
import ProductImage from "@components/product/productImage";

export async function getStaticProps() {
  try{
    const response = await fetch('https://hidrasport.com.ar/api/store/products/filter/',
    {    
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "categories": ["Mujer"]
        }),
    })
  
    const data = await response.json();
    return {
  
      props: { products: data.results as Product[] },
    };
  }catch(error){
    console.log(error);
    return {
      props: { products: [] },
    };
  }

} 

const Productos = ({products}:InferGetStaticPropsType<typeof getStaticProps> ) => {
 
  
  const router = useRouter();
  const { categoria } = router.query;
  console.log('front productos', products.length);
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Nuestros Productos de Mujer
        </h2>

        {products.length === 0? 
        <section>
          <p>No hay productos cargados</p>
        </section>  
        :

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
            products.map((product: Product) => (
              <div key={product.id} className="group relative">
                <ProductImage product={product} />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.title}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </div>  
                         
              ))
          }
        </div>
      }
      </div>
    </div>
  );
};

export default Productos;
