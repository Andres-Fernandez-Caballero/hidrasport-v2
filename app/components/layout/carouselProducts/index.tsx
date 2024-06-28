import ProductCardItem from "@components/layout/product/productCardItem";
import { Product } from "@interfaces/IProduct";
import Carousel from "react-multi-carousel";


interface CarouselProductsProps {
    products: Product[]
}

const CarouselProducts = (props: CarouselProductsProps) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
    
    
      return (
        <Carousel
          responsive={responsive}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          arrows={false}
          className="w-full"
        >
          {props.products.map((product, ) => (
            <div key={product.title_id} className="p-4">
              <div className="bg-white shadow-md rounded-lg overflow-hidden mb-5 min-h-96">
                <ProductCardItem
                  product={product} />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      );
    
}

export default CarouselProducts;