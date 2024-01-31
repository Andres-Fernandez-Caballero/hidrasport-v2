import MessageBar from "@components/layout/messagesBar";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import useSWR from "swr";
import { SERVER_URL } from "@config/index";

interface resultsProps {
  id: number;
  banner: string;
}

interface dataProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: resultsProps[];
}

// FUTURA CARACTERISTICA
// const imageLoader = ({ src, width, quality }) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`
// }

const items: ImageGridLinkItem[] = [
  {
    image: "/images/banners/mujer.jpeg",
    label: "Mujeres",
    link: "/productos/Mujer",
  },
  {
    image: "/images/banners/hombre.jpeg",
    label: "Hombres",
    link: "/productos/Hombre",
  },
  {
    image: "/images/banners/guardavida.jpeg",
    label: "Guardavidas",
    link: "/productos/guardavidas",
  },
  {
    image: "/images/banners/invierno.png",
    label: "Invierno",
    link: "/productos/Invierno",
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
      className="w-full h-fit"
    >
      {props.items.map((item, index: number) => (
        <figure className=" relative opacity-90 h-fit" key={index + item.label}>
          <Image
            src={item.image}
            alt={item.label}
            width={400}
            height={400}
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
    <menu className="grid gap-1 grid-rows-1 grid-cols-4 m-2 h-fit">
      {props.items.map((item, index: number) => (
        <Link
          href={item.link}
          className="relative opacity-90 h-fit"
          key={index + item.label}
        >
          <Image
            src={item.image}
            alt={item.label}
            width={400}
            height={400}
            className="rounded-sm"
          />
          <h2 className="absolute top-0 left-0 p-4  text-lg text-red-100">
            {item.label}
          </h2>
        </Link>
      ))}
    </menu>
  );
};

const fetcher = (url: string): Promise<dataProps> =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw Error("Error al cargar los datos");
      return res.json() as Promise<dataProps>;
    })
    .catch((e) => {
      throw e;
    });

const Home: NextPage = () => {
  const { data, error } = useSWR(
    `${SERVER_URL}/api/store/site-configuration/`,
    fetcher,
  );
  if (!data && !error) return <div>Loading...</div>;
  if (error) {
    // guardar el error en un log
    console.error(error);
  }

  return (
    <main>
      <section>
        {data &&
          data.results.map((item) => (
            <div
              key={item.id}
              className="banner flex items-center justify-center h-96"
            >
              <Image
                className="object-cover w-full h-full"
                src={item.banner.replace(
                  "http://localhost:8000",
                  "https://hidrasport.com.ar",
                )}
                height={800}
                width={800}
                alt="banner"
              />
            </div>
          ))}
      </section>

      <section className="flex">
        <h2 className="sr-only">CATEGORIAS POPULARES</h2>
        <div className="sm:hidden">
          <CarouselHome items={items} />
        </div>
        <div className="hidden sm:flex justify-center mx-auto h-fit">
          <BannerHome items={items} />
        </div>
      </section>
      <MessageBar
        messages={[
          "Envios en toda capital Gratis",
          "Devoluciones sin cargo",
          "Cuotas sin interes 💳",
          "Mas de 1000 productos 🛒 ",
        ]}
        delay={3000}
      />
      <section className="grid grid-cols-3 justify-center my-4">
        <article className="flex justify-center gap-2 items-center">
          <i className="fa-solid fa-truck-fast"></i>
          <h3 className="text-sm text-gray-500">Costos y tiempos de envio</h3>
        </article>
        <article className="flex justify-center gap-2 items-center">
          <i className="fa-regular fa-credit-card "></i>
          <h3>Cuotas y Formas de pago</h3>
        </article>
        <article className="flex justify-center gap-2 items-center">
          <i className="fa-solid fa-percent"></i>
          <h3>Cambios y devoluciones</h3>
        </article>
      </section>
      <section className="">
        <h2 className="ml-2 text-2xl">Productos Destacados 🥇</h2>
        <div className="grid grid-cols-4 gap-4 m-4">
          <article className="border rounded-md">
            <h3 className="sr-only">ENVIOS</h3>
            <figure>
              <p>Envios a todo el pais</p>
              <Image
                src="/images/envio-azul.jpg"
                alt="Envios a todo el pais"
                width={400}
                height={400}
                className="rounded-sm"
              />
            </figure>
          </article>

          <article className="border rounded-md">
            <h3 className="sr-only">ENVIOS</h3>
            <figure>
              <p>Política de devoluciones </p>
              <Image
                src="/images/devolucion.jpg"
                alt="Envios a todo el pais"
                width={800}
                height={400}
                className="rounded-sm"
              />
            </figure>
          </article>

          <article className="border rounded-md">
            <h3 className="sr-only">ENVIOS</h3>
            <figure>
              <p>Asistencia online</p>
              <Image
                src="/images/soporte.jpg"
                alt="Envios a todo el pais"
                width={800}
                height={400}
                className="rounded-sm"
              />
            </figure>
          </article>

          <article className="border rounded-md">
            <h3 className="sr-only">ENVIOS</h3>
            <figure>
              <h3>Conoce Hidralife</h3>
              <Image
                src="/images/guarda3.jpg"
                alt="Envios a todo el pais"
                width={800}
                height={400}
                className="rounded-sm"
              />
            </figure>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home; //Foto de <a href="https://unsplash.com/es/@shutter_speed_?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Bastian Riccardi</a> en <a href="https://unsplash.com/es/fotos/un-carrito-de-compras-de-juguete-BQ9usyzHx_w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
