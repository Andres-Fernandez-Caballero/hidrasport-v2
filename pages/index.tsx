import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";

const items: ImageGridLinkItem[] = [
  {
    image: "/images/banners/mujer.jpeg",
    label: "Mujeres",
    link: "/mujeres",
  },
  {
    image: "/images/banners/hombre.jpeg",
    label: "Hombres",
    link: "/hombres",
  },
  {
    image: "/images/banners/guardavida.jpeg",
    label: "Guardavidas",
    link: "/guardavidas",
  },
  {
    image: "/images/banners/invierno.png",
    label: "Invierno",
    link: "/invierno",
  },
];

interface ImageGridLinkItem {
  image: string;
  label: string;
  link: string;
}

interface ImageGridProps {
  items: ImageGridLinkItem[];
}

const CarouselHome: React.FC<ImageGridProps> = (props) => {
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
    <Carousel
      responsive={responsive}
      showDots={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      arrows={false}
    >
      {props.items.map((item, index: number) => (
        <figure className=" relative opacity-90 " key={index + item.label}>
          <Image
            src={item.image}
            alt={item.label}
            width={800}
            height={800}
            className="rounded-sm"
          />
          <h2 className="absolute top-0 p-4  flex justify-center items-center text-lg text-red-100">
            {item.label}
          </h2>
        </figure>
      ))}
    </Carousel>
  );
};

const BannerHome: React.FC<ImageGridProps> = (props) => {
  return (
    <menu className="grid gap-1 grid-rows-1 grid-cols-4 m-2">
      {props.items.map((item, index: number) => (
        <figure className=" relative opacity-90" key={index + item.label}>
          <Image
            src={item.image}
            alt={item.label}
            width={600}
            height={600}
            className="rounded-sm"
          />
          <h2 className="absolute top-0 left-0 p-4  text-lg text-red-100">
            {item.label}
          </h2>
        </figure>
      ))}
    </menu>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <div className="sm:hidden">
        <CarouselHome items={items} />
      </div>
      <div className="hidden sm:flex justify-center h-screen">
        <BannerHome items={items} />
      </div>
    </>
  );
};

export default Home;
