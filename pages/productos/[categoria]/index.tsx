import ProductImage from "@components/product/productImage";
import { SERVER_URL } from "@config/index";
import { Product } from "@interfaces/IProduct";
import Link from "next/link";
import { useRouter } from "next/router";

export interface CategoriaProductProps {
  products: Product[];
}

// @ts-ignore
export async function getServerSideProps(context) {
  let products = [] as Product[];
  const categoria = context.params.categoria;
  const res = await fetch(
    `${SERVER_URL}/api/store/products/filter/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories: [categoria],
      }),
    }
  );
  const data = await res.json();
  products = data.results as Product[];

  return { props: { products } };
}

export interface CategoriaProductProps {
  products: Product[];
}

const CategoriaProduct = ({ products }: CategoriaProductProps) => {
  const router = useRouter();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Nuestros Productos de Mujer
        </h2>

        {products.length === 0 ? (
          <section>
            <p>No hay productos cargados 😵‍💫</p>
          </section>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: Product) => (
              <div key={product.id} className="group relative">
                <ProductImage product={product} />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/productos/detalle/${product.id}`}>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        {product.title.titulo}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriaProduct;
