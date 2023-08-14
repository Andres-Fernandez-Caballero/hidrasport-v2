import { SERVER_URL } from '@config/index'
import { Product } from '@interfaces/IProduct'
import Image from 'next/image'
import CarouselImage from './carousseImage'

export interface ImageContainerProps {
  product: Product
}
const ImageContainer = ({product}: ImageContainerProps) => {

    const images = product.subproducto[0].images.map(item => (item.image.replace('http://localhost:8000', SERVER_URL)?? '/images/remera_frente.png'))

    return (
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        
        {images.map(image => 
          <div key= {image} className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <Image
              width={600}
              height={600}
              src={image}
              alt={product.title.titulo}
              className="h-full w-full object-cover object-center"
            />
          </div>  
        )}

        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg lg:hidden">
          <CarouselImage images={images}/>
        </div>
      </div>
    )
}

export default ImageContainer