import Link from "next/link";
import ProductImage from "./productImage";
import { Product } from "@interfaces/IProduct";

interface ProductGridListProps {
  products: Product[];
}

const ProductGridList: React.FC<ProductGridListProps> = ({ products }) => (
  <section className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {products.map((product, index: number) => (
      <article key={index} className="group relative">
        <ProductImage product={product} />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link href={`/productos/detalle/${product.title_id}`}>
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.title}
              </Link>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
      </article>
    ))}
  </section>
);

export default ProductGridList;
