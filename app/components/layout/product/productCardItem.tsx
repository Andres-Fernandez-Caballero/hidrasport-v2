import { Product } from "@interfaces/IProduct"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

        <article
            className="group relative bg-white p-4 rounded-lg"
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
    )
}

export default ProductCardItem; 