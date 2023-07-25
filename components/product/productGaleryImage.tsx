import { Product } from "@interfaces/IProduct"
import Image from "next/image"

export interface ProductGaleryImageProps {
    product: Product
}

const ProductGaleryImage = ({product}: ProductGaleryImageProps) => {
    return (
        <figure>
            {product.subproducto.map(item => (
                item.images.map((image, index)=>
                    <Image src={image.image}  height={600} width={600} alt="image" key={index}/>
                )
            ))}
        </figure>
    )
} 

export default ProductGaleryImage