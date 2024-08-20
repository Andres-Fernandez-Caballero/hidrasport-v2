import { Product, ProductDetail, Variant } from "@interfaces/IProduct";
import styles from "./styles.module.css";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import SelectorVariante from "./selectorVariante/SelectorVariante";
import { handleOnSubmit } from "./selectorVariante/SelectorVariante";
import ImageContainer from "./imageContainer/ImageContainer";
import useCartStore from "@store/cart/useCartStore"; // Importa el hook de la tienda del carrito

export const getServerSideProps: GetServerSideProps<{
  product: Product | undefined | null;
}> = async (context) => {
  try {
    const { query, req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['host'];
    const apiUrl = `${protocol}://${host}/api/products/${query.id}`;

    const result = await fetch(apiUrl);
    let product;

    if (result.status === 200) {
      product = await result.json();
      return { props: { product } };
    } else {
      return { props: { product: undefined } };
    }
  } catch (err) {
    return { props: { product: null } }
  }
};

const getVariantsFromProduct = (product: ProductDetail) =>
  Object.entries(product.subcodigo_color_dict).map((i) => (
    {
      subProductId: i[0],
      ...i[1],
    }
  ));

interface DetalleProps {
  product: ProductDetail | undefined;
}

const Detalle = ({ product }: DetalleProps) => {
  const variants = product ? getVariantsFromProduct(product) : [];
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(variants.length > 0 ? variants[0] : null);
  const [size, setSize] = useState<string>(""); // Estado para el tamaño seleccionado
  const { addToCart } = useCartStore(); // Hook para agregar al carrito

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  const handleAddToCart = () => {
    if (currentVariant) {
      handleOnSubmit(
        new Event('submit') as React.FormEvent<HTMLFormElement>, // Generar un evento de formulario ficticio
        size,
        currentVariant.subProductId,
        addToCart
      );
    }
  };

  return (
    <div className={styles.productContainer}>
      
      <div>
        <div className="md:flex p-4">
          <div className="md:flex-col ">
            {currentVariant && <ImageContainer variant={currentVariant} />}
          </div>
          <div className={styles.detailContainer}>
          <header className="lg:col-span-2  lg:pr-8">
            <h1 className="text-2xl font-bold text-center tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </header>
          <div className="md:flex-col mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            {currentVariant && (
              <SelectorVariante
                product={product}
                variants={variants.sort( (a,b) => product.available_colors.indexOf(a.color) - product.available_colors.indexOf(b.color) ) }
                currentVariant={currentVariant}
                setCurrentVariant={setCurrentVariant}
                size={size} // Pasamos el tamaño seleccionado como prop
                setSize={setSize} // Pasamos la función para actualizar el tamaño como prop
              />
            )}
          </div>

          <div className="mx-auto max-w-2xl px-4 pt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="py-2 lg:col-span-2 lg:col-start-1">
              <article className="mt-10">
                <h2 className="text-xl font-bold text-gray-900">
                  Preguntas Frecuentes
                </h2>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                      <span className="text-gray-600">
                      ¿Tienen stock?
                      </span>
                      <p className="text-xs">Disponemos de stock permanente.</p>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                      ¿Puedo comprar varios productos y que llegue en un solo envío?
                      </span>
                      <p className="text-xs"> Se pueden realizar varios pedidos en una sola comprar para que sean enviados en un solo viaje. </p>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                      ¿Cuál es el costo de envío?
                      </span>
                      <p className="text-xs">El servicio de envío tiene un costo establecido por Mercado Envíos sujeto a la zona donde reside el comprador (Exceptuando nuestros productos destacados con envio gratis)</p>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                      ¿Cambios de productos?
                      </span>
                      <p className="text-xs">Los cambios de productos se coordinan con el asesor comercial de Hidra Sport y está sujeto a disponibilidad del producto y otras variables.</p>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                      Formas de pagos.
                      </span>
                      <p className="text-xs">Es posible pagar por Tarjeta de Crédito y Débito por Mercado Pago. Consultar siempre las promociones vigentes al momento de la compra.</p>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                      ¿Los productos tienen garantía?
                      </span>
                      <p className="text-xs">Todos nuestros productos cuentan con nuestra garantía de fabrica oficial. Con la posibilidad de cambiar el producto, de padecer algún desperfecto técnico. Sujeto a revisión de nuestro departamento de garantías para posterior autorización de la entrega del nuevo producto.</p>
                    </li>                  
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className={styles.productAdd}>
        <span>
          ${product.price}
        </span>
        <button className={styles.buttonAdd} label="Añadir al carrito" onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default Detalle;
