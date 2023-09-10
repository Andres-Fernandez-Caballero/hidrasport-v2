import { Product } from "@interfaces/IProduct";
import Image from "next/image";
export interface ProductImageProps {
  product: Product;
}

const ProductImage = ({ product }: ProductImageProps) => {
  function getFrontImage() {
    let image = "/images/remera_frente.png"; // default image
    if (
      product.images &&
      product.images.length > 0 &&
      product.images[0].image !== undefined
    )
      image = product.images[0].image;
    image = `https://hidrasport.com.ar${image}`;
    return image;
  }
  console.log("product", product);

  return (
    <figure className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <Image
        height={600}
        width={600}
        src={getFrontImage()}
        alt={product.title}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </figure>
  );
};

export default ProductImage;
