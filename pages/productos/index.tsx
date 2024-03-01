"use client";

import ContentMain from "@components/layout/contentMain";
import EmptyProduct from "@components/product/emptyProduct";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React from "react";
import { SERVER_URL } from "@config/index";
import useSWR from "swr";
import ProductGridList from "@components/product/productGridList";
import Loader from "@components/Loader";

const ProductListPage: React.FC = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "2";

  const nextPage = (searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(Number(page) + 1));
    console.log("page2");
  };

  const urlApi = `/api/products/?page=${page}`;

  const fetcher = async (url: string, page = "1") => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(page);

    if (!response.ok) throw new Error("error fetching");

    return data;
  };
  const { data, error, isLoading } = useSWR([urlApi, page], ([url, page]) =>
    fetcher(url, page),
  );

  return (
    <ContentMain title="Nuestros Productos">
      {error && <EmptyProduct />}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <ProductGridList products={data.results} />
          <button onClick={() => nextPage(searchParams)}>Next</button>
        </div>
      )}
    </ContentMain>
  );
};

export default ProductListPage;
