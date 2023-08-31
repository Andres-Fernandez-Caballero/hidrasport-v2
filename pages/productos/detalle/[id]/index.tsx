import { Product, ProductDetail, Variant } from "@interfaces/IProduct";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { SERVER_URL } from "@config/index";
import SelectorVariante from "./selectorVariante/SelectorVariante";
import ImageContainer from "./imageContainer/ImageContainer";

export const getServerSideProps: GetServerSideProps<{
  product: Product | undefined;
}> = async (context) => {
  const { query } = context;
  const result = await fetch(`${SERVER_URL}/api/store/products/${query.id}/ `);
  let product;
  if (result.status === 200) {
    product = await result.json();
    return { props: { product } };
  } else {
    return { props: { product: undefined } };
  }
};

const getVariantsFromProduct = (product: ProductDetail) =>
  Object.entries(product.subcodigo_color_dict).map((i) => ({
    subProductId: i[0],
    ...i[1],
  }));

interface DetalleProps {
  product: ProductDetail;
}

const Detalle = ({ product }: DetalleProps) => {
  const variants = getVariantsFromProduct(product);
  const [currentVariant, setCurrentVariant] = useState<Variant>(variants[0]);
  
  return (
    <div className="bg-white">
      {product && (
        <div className="pt-6">
          <ImageContainer variant={currentVariant} />
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <header className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </header>

            <section className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>
              <SelectorVariante 
                product={product}
                variants={variants}
                currentVariant={currentVariant}
                setCurrentVariant={setCurrentVariant}
              />
            </section>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* <!-- Description and details --> */}
              <article>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    The Basic Tee 6-Pack allows you to fully express your
                    vibrant personality with three grayscale options. Feeling
                    adventurous? Put on a heather gray tee. Want to be a
                    trendsetter? Try our exclusive colorway: &quot;Black&quot;.
                    Need to add an extra pop of color to your outfit? Our white
                    tee has you covered.
                  </p>
                </div>
              </article>

              <article className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Hand cut and sewn locally
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Dyed with our proprietary colors
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Pre-washed &amp; pre-shrunk
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Ultra-soft 100% cotton
                      </span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    The 6-Pack includes two black, two white, and two heather
                    gray Basic Tees. Sign up for our subscription service and be
                    the first to get new, exciting colors, like our upcoming
                    &quot;Charcoal Gray&quot; limited release.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detalle;
