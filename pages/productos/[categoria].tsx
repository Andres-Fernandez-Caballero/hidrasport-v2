import ContentMain from "@components/layout/contentMain";
import EmptyProduct from "@components/product/emptyProduct";
import ProductGridList from "@components/product/productGridList";
import { SERVER_URL } from "@config/index";
import { Product } from "@interfaces/IProduct";
import Link from "next/link";
import React from "react";

export interface CategoriaProductProps {
  products: Product[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function getServerSideProps(context) {
  let products = [] as Product[];
  let prev = null;
  let next = 2;
  let current = 1;
  if (context.query.page && !isNaN(Number(context.query.page))) {
    const page = Number(context.query.page);
    if (page > 1) {
      prev = page - 1;
      next = page + 1;
      current = page;
    }
  }
  const API_PRODUCTS_FILTER = `${SERVER_URL}/api/store/products/filter/?page=${current}`;

  const categoria = context.params.categoria;
  const res = await fetch(API_PRODUCTS_FILTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categories: categoria,
    }),
  });

  const data = await res.json();
  products = data.results as Product[];
  products = products.filter((product) => product);

  return { props: { products, categoria, next, prev, current } };
}

export interface CategoriaProductProps {
  products: Product[];
  categoria: string;
  next: number;
  prev: number;
  current: number;
}

const CategoriaProductPage: React.FC<CategoriaProductProps> = ({
  products,
  categoria,
  prev,
  next,
  current,
}) => {
  return (
    <ContentMain title={`Nuestros Productos de ${categoria}`}>
      {products.length === 0 ? (
        <EmptyProduct />
      ) : (
        <ProductGridList products={products} />
      )}

      <nav className="container columns-3  flex justify-center gap-3 font-bold mt-3">
        <Link
          className={`${prev === null && "invisible"} text-blue-400`}
          href={`/productos/${categoria}?page=${prev}`}
        >
          <span>
            <i className="fa-solid fa-backward"></i> Prev
          </span>
        </Link>
        <p>{current}</p>
        <Link
          className={`${next === null && "invisible"}  text-blue-400`}
          href={`/productos/${categoria}?page=${next}`}
        >
          <span>
            Next <i className="fa-solid fa-forward"></i>
          </span>
        </Link>
      </nav>
    </ContentMain>
  );
};

export default CategoriaProductPage;
