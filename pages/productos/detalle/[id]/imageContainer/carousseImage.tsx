import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css'
import Image from "next/image"

export interface CarouselProps {
    images: string[]
}

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
}

const CarouselImage = ({images}: CarouselProps) => {
    return (
        <Carousel
            responsive={responsive}
        >
            {images.map(image => 
                <figure key={image}>
                    <Image src={image} height={600} width={600} alt="producto"/>
                </figure>
                
            )}
        </Carousel>
    )
}

export default CarouselImage