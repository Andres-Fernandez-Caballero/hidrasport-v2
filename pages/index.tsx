import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

const CarouselHome  = () => {
  const responsive = {
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel responsive={responsive} showDots={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              arrows={false}
              >  

              <figure className=" relative opacity-90 ">
              <Image
                src="/images/banners/mujer.jpeg"
                alt="mujer atleta"
                width={800}
                height={500}
                className="rounded-sm"
              />
              <h2 className="absolute top-0 p-4  flex justify-center items-center text-lg text-red-100">
              Mujeres
            </h2>
              </figure>
              <figure className=" relative opacity-90">
              <Image
                src="/images/banners/hombre.jpeg"
                alt="hombre atleta"
                width={800}
                height={500}
              />
               <h2 className="absolute top-0 left-0 p-4 text-lg text-red-100">
              Hombres
            </h2>

              </figure>
              <figure className=" relative opacity-90">
              <Image
                src="/images/banners/guardavida.jpeg"
                alt="Guardavida"
                width={800}
                height={500}
              />
              <h2 className="absolute top-0 left-0 p-4 text-lg text-center text-red-100">
              Guardavidas
            </h2>
              </figure>
              <figure className=" relative opacity-90">
              <Image
                src="/images/banners/invierno.png"
                alt="ropa invernal"
                width={800}
                height={500}
              />
              <h2 className="absolute top-0 left-0 p-4 text-lg text-white">
              Invierno
            </h2>
              </figure>
          </Carousel>
  )
}

const BannerHome = () => {
  return (
    <menu className="grid gap-1 grid-rows-1 grid-cols-4 m-2">
    <figure className=" relative opacity-90">
      <Image
        src="/images/banners/mujer.jpeg"
        alt="mujer atleta"
        width={500}
        height={500}
        className="rounded-sm"
      />
      <h2 className="absolute top-0 left-0 p-4  text-lg text-red-100">
        Mujeres
      </h2>
    </figure>
    <figure className="relative opacity-90">
      <Image
        src="/images/banners/hombre.jpeg"
        alt="hombre atleta"
        width={500}
        height={500}
      />
      <h2 className="absolute top-0 left-0 p-4 text-lg text-red-100">
        Hombres
      </h2>
    </figure>
    <figure className="relative opacity-90">
      <Image
        src="/images/banners/guardavida.jpeg"
        alt="Guardavida"
        width={500}
        height={500}
      />
      <h2 className="absolute top-0 left-0 p-4 text-lg text-red-100">
        Guardavidas
      </h2>
    </figure>
    <figure className="relative opacity-80">
      <Image
        src="/images/banners/invierno.png"
        alt="ropa invernal"
        width={500}
        height={500}
      />
      <h2 className="absolute top-0 left-0 p-4 text-lg text-white">
        Invierno
      </h2>
    </figure>
  </menu>
  )

}

const Home: NextPage = () => {
  
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (<>
       {
      isMobile && (
        <CarouselHome/>
      )
    }
    <div className="flex justify-center h-screen">
      {
        !isMobile && (
          <BannerHome/>
        )
      }
    </div>
  </>)
};

export default Home;
