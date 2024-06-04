"use client";

import ContentMain from "@components/layout/contentMain";
import EmptyProduct from "@components/product/emptyProduct";
import React, { useState } from "react";
import useSWR from "swr";
import ProductGridList from "@components/product/productGridList";
import Loader from "@components/Loader";
import { useRouter } from "next/router";

const ProductListPage: React.FC = () => {

  const router = useRouter();
  const page = router.query.query as string;
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1)
  const urlApi = `/api/products/?page=${currentPage}&setCurrent`;

  const fetcher = async (url: string, page = 1) => {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();

    if (!response.ok) throw new Error("error fetching");

    return data;
  };
  
  const { data, error, isLoading } = useSWR([urlApi, page], ([url, page]) =>
    fetcher(url, parseInt(page)),
);

  const nextPage = () => {
    try {
      const urlObj = new URL(data.next);
      const page = urlObj.searchParams.get('page') || "1"; 
      setCurrentPage(parseInt(page));
      router.push(`/productos?page=${page}`, undefined, { shallow: true });
      
    } catch (error) {
      console.error('Invalid URL:', error);
    }
  }

  return (
    <ContentMain title="Nuestros Productos">
      {error && <EmptyProduct />}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <ProductGridList products={data.results} />
          <button onClick={() => nextPage()}>Next</button>
        </div>
      )}
    </ContentMain>
  );
};

export default ProductListPage;
