import { Product } from "@interfaces/IProduct"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";

interface ProductCadItemProps {
    product: Product
}

const ProductCardItem = ({ product }: ProductCadItemProps) => {

    function getFrontImage() {
        const image = product?.images?.[0]?.image || "/images/remera_frente.png";
        return `${image}`;
    }

    function getBackImage() {
        const image = product?.images?.[1]?.image || "/images/remera_frente.png";
        return `${image}`;
    }

    const [imageSrc, setImageSrc] = useState(getFrontImage());

    function handleOnMouseEnter() {
        setImageSrc(getBackImage());
    }

    function handleOnMouseLeave() {
        setImageSrc(getFrontImage());
    }

    return (
        <div className={styles.productCardContainer}>
            <Link href={`/productos/detalle/${product.title_id}`}>
                <article
                    className={styles.itemCard}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                >
                    <figure
                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80 transition duration-500 ease-in-out"
                    >
                        <div className="relative h-full w-full">
                            <Image
                                height={600}
                                width={600}
                                src={imageSrc}
                                alt={product.title}
                                className="h-full w-full object-cover object-center transition-opacity duration-500 ease-in-out"
                            />
                        </div>
                    </figure>
                    <div className={styles.productDescriptionContainer}>
                        <div className={styles.productDescription}>
                            <h3 className={styles.productName}>
                                <span aria-hidden="true" className="absolute inset-0"></span>
                                {product.title}
                                <br />
                                <span className={styles.productPromotion}>3 Cuotas sin interes</span>
                            </h3>
                            <span className={styles.productPrice}>${product.price}</span>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
}

export default ProductCardItem;
