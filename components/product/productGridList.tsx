import { Product } from "@interfaces/IProduct";
import ProductCardItem from "./productCardItem";

interface ProductGridListProps {
  products: Product[];
}

const ProductGridList: React.FC<ProductGridListProps> = ({ products }) => (
  <section className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {products.map((product, index: number) => (
      <ProductCardItem product={product} key={index} />
    ))}
  </section>
);

export default ProductGridList;
