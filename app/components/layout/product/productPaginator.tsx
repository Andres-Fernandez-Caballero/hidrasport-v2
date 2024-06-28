interface ProductPaginatorProps {
  page: string;
  prePageLink: string | null;
  nextPageLink: string | null;
}

const ProductPaginator = (props: ProductPaginatorProps) => {
  console.log(props);

  return <h1>producto paginador</h1>;
};

export default ProductPaginator;
