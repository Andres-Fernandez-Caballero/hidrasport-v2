import { IProduct, Product } from '@interfaces/IProduct'
import Image from 'next/image'
export interface ProductImageProps {
    product:Product
}

const ProductImage = ({product}: ProductImageProps) => {
    
    function getFrontImage() {
        let image = '/images/remera_frente.png'
        if (
            product.subproducto &&
			product.subproducto.length > 0 &&
			product.subproducto[0].images.length> 0
		)
			image = product.subproducto[0].images[0].image;
            image = image.replace('http://localhost:8000', 'https://hidrasport.com.ar');
        return image;
    }

    return (
        <figure className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
            <Image
                    height={600}
                    width={600}
                    src={getFrontImage()}
                    alt={product.title.titulo}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
        </figure>
    )
}

export default ProductImage