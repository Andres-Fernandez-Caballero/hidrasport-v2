import MessageBar from "@components/layout/messagesBar";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import styles for the carousel
import useSWR from "swr";
import { SERVER_URL } from "@config/index";
import Loader from "@components/Loader";

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

const CarouselHome: React.FC<ImageGridProps> = () => {
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

  const productosDestacados = [
    {
      title_id: 171,
      title: "Rompevientos Guardavidas Ocean",
      price: 46899.0,
      b2b_price: 25911.697500000002,
      images: [
        {
          image: "/static/media/products/ROJA_FRENTE_lAs0yjQ.png",
        },
        {
          image: "/static/media/products/ROJA_ESPALDA_2024.png",
        },
      ],
    },
    {
      title_id: 80,
      title: "Primera Piel Protect UV Guardavidas",
      price: 32990.0,
      b2b_price: 18226.975,
      images: [
        {
          image: "/static/media/products/PRIMERA_PIEL_BLANCA_FRENTE_LOGO_ROJO_WEB.png",
        },
        {
          image: "/static/media/products/PRIMERA_PIEL_BLANCA_ESPALDA_2024.png",
        },
      ],
    },
    {
      title_id: 80,
      title: "Primera Piel Protect UV Guardavidas",
      price: 32990.0,
      b2b_price: 18226.975,
      images: [
        {
          image: "/static/media/products/BLANCA_ROJA_FRENTE.png",
        },
        {
          image: "/static/media/products/BLANCA_ROJA_ESPALDA.png",
        },
      ],
    },
    {
      title_id: 172,
      title: "Sungon Geo Slim",
      price: 30199.0,
      b2b_price: 16684.947500000002,
      images: [
        {
          image: "/static/media/products/TRIANGULOS_AZUL_FRENTE.png",
        },
        {
          image: "/static/media/products/TRIANGULOS_AZUL_ESPALDA.png",
        },
      ],
    },
    {
      title_id: 168,
      title: "Manual de Soporte Vital Básico en Ahogamiento",
      price: 7299.0,
      b2b_price: 4032.6975,
      images: [
        {
          image: "/static/media/products/MANUAL_PNG_WEB_zFMl3QJ.png",
        },
      ],
    },
    {
      title_id: 164,
      title: "Short de Baño Clasico Unisex Con suspensor",
      price: 26399.0,
      b2b_price: 14585.447500000002,
      images: [
        {
          image: "/static/media/products/AZUL_FRENTE2_Spvfj9i.png",
        },
        {
          image: "/static/media/products/AZUL_ESPALDA_2_nsf6a4l.png",
        },
      ],
    },
    {
      title_id: 163,
      title: "Sungon Classic Guardavidas",
      price: 30199.0,
      b2b_price: 16684.947500000002,
      images: [
        {
          image: "/static/media/products/ROJO_FRENTE_HWfquPT.png",
        },
        {
          image: "/static/media/products/ROJO_ESPALDA_NHPAiLF.png",
        },
      ],
    },
    {
      title_id: 114,
      title: "Campera Clásica HS Unisex Guardavidas",
      price: 45299.0,
      b2b_price: 25027.697500000002,
      images: [
        {
          image: "/static/media/products/CLASICA_GUARD_2024.png",
        },
        {
          image: "/static/media/products/CLASICA_GUARD_2024_ESPALDA.png",
        },
      ],
    },
  ];

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
      {productosDestacados.map((item, index: number) => (
        <div key={index} className="p-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-5 min-h-96">
            <Image
              src="https://picsum.photos/300/300"
              alt={item.title}
              width={400}
              height={400}
              className="object-cover w-full h-56 m-4"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-500">${item.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

const BannerHome: React.FC<ImageGridProps> = (props) => {
  return (
    <menu className="grid gap-1 grid-rows-1 grid-cols-4 m-5 h-fit">
      {props.items.map((item, index: number) => (
        <Link
          href={item.link}
          className="relative opacity-90 h-fit m-2 "
          key={index + item.label}
          style={{ position: 'relative' }}
        >
          <Image
            src={item.image}
            alt={item.label}
            width={400}
            height={400}
            className=" blur-sm "
          />
          <h2 className="font-sans font-bold text-4xl text-blue-50 tracking-wide absolute inset-0 flex items-center justify-center p-4 bg-transparent bg-opacity-0 hover:bg-opacity-25 hover:scale-110 ease-in-out duration-300">
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
  if (!data && !error) return <Loader />;
  if (error) {
    console.error(error);
  }
  return (
    <main>
      {/* 
      <section>
        {data &&
          data.results.map((item) => (
            <div
              key={item.id}
              className="banner flex items-center justify-center"
            >
              <Image
                className="object-cover w-full "
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

     */}
    <section
      style={{
        backgroundImage: data && `url(${data.results[0].banner.replace(
          "http://localhost:8000",
          "https://hidrasport.com.ar"
        )})`,
      }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Pseudo-elemento ::before para el fondo desenfocado */}
      <div className="absolute bg-cover inset-0 bg-center  blur-sm" style={{ backgroundImage: data && `url(${data.results[0].banner.replace(
          "http://localhost:8000",
          "https://hidrasport.com.ar"
        )})` }}></div>

      {/* Contenido sobre la imagen */}
      <div className="md:z-10 flex h-screen w-full">
        <div className="w-1/2 flex flex-col justify-center items-center">
          {/* Contenido de la columna izquierda (información) */}
          <div className="rounded-md text-center p-2 m-2  bg-opacity-75 backdrop-blur-md">
            <h2 className="text-2xl font-bold m-4">Información</h2>
            <p className="text-center m-4 text-xl text-white">
              Aquí va la información. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <MessageBar
              messages={[
                "Envios en toda capital GRATIS",
                "Devoluciones sin cargo",
                "Cuotas sin interés 💳",
                "Más de 1000 productos 🛒 ",
              ]}
              delay={5000}
            />
            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">¡Nuestros productos!</button>
          </div>
        </div>
        <div className="w-1/2 p-4 flex flex-col justify-center items-center">
          {/* Contenido de la columna derecha (imágenes) */}
          <img src="https://picsum.photos/500/500" alt="Placeholder" className="mb-4" />
        </div>
      </div>
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

      <section className="grid grid-cols-1 md:grid-cols-3 justify-center items-center my-20 space-x-4 m-10">
        
        <article className="flex justify-center gap-2 items-center shadow-2xl bg-slate-200 rounded-xl p-6">        
          <i className="fa-solid fa-truck-fast text-4xl"></i>
          <h3 className="text-2xl font-bold mt-3 ml-3 ">Costos y tiempos de envío</h3>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400  opacity-75">          
            </span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </article>
        <article className="flex justify-center gap-2 items-center shadow-2xl bg-slate-200 rounded-xl p-6">
          <i className="fa-solid fa-credit-card text-4xl"></i>
          <h3 className="text-2xl font-bold mt-3 ml-3">Cuotas y formas de pago</h3>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400  opacity-75">          
            </span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </article>
        <article className="flex justify-center gap-2 items-center shadow-2xl bg-slate-200 rounded-xl p-6">
          <i className="fa-solid fa-percent text-4xl"></i>
          <h3 className="text-2xl font-bold mt-3 ml-3">Cambios y devoluciones</h3>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400  opacity-75">          
            </span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </article>
      </section>
      <section className="productos_dest">
        <h2 className="text-2xl text-center font-extrabold">Productos Destacados 🥇</h2>

                
        <CarouselHome items={items} />

        {/* SECCION CARDS */}
        <div className="flex items-center justify-center m-10  container mx-auto ">
          {/* GRID */}
          <div className="grid space-x-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-10">
            {/* CARDS */}
            {/* Card1 */}
            <div className="rounded-xl shadow-xl bg-gray-100">
              <div className=" p-5 flex flex-col ">
                <div className="rounded-xl overflow-hidden">
                  <Image
                      src="/images/envio-azul.jpg"
                      alt="Envios a todo el pais"
                      width={400}
                      height={400}
                      className="rounded-sm max-h-48"
                    />
                </div>
                <h3 className="text-2xl font-medium mt-3 text-center">Envíos.</h3>
                <p className="text-slate-500 text-lg mt-3 text-center">Nuestro sitio web ofrece envíos rápidos y seguros a tu puerta. ¡Compra ahora y recibe tus productos en la comodidad de tu hogar!</p>
              </div>
            </div>
            {/* Card2 */}
            <div className="rounded-xl shadow-xl bg-gray-100">
              <div className="p-5 flex flex-col">
                <div className="rounded-xl overflow-hidden">
                <Image
                    src="/images/devolucion.jpg"
                    alt="Envios a todo el pais"
                    width={800}
                    height={400}
                    className="rounded-sm max-h-48"
                  />
                </div>
                <h3 className="text-2xl font-medium mt-3 text-center">Política de devoluciones.</h3>
                <p className="text-slate-500 text-lg mt-3 text-center">Si por alguna razón no estás satisfecho con tu compra, contáctanos y estaremos encantados de ayudarte con el proceso de devolución.</p>
              </div>
            </div>
            {/* Card3 */}
            <div className="rounded-xl shadow-xl bg-gray-100">
              <div className="p-5 flex flex-col">
                <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/soporte.jpg"
                  alt="Envios a todo el pais"
                  width={800}
                  height={400}
                  className="rounded-sm max-h-48"
                />
                </div>
                <h3 className="text-2xl font-medium mt-3 text-center">Asistencia online.</h3>
                <p className="text-slate-500 text-lg mt-3 text-center">Ofrecemos asistencia en línea para responder todas tus preguntas y resolver cualquier problema que puedas tener. ¡Estamos aquí para ayudarte!</p>
              </div>
            </div>
            {/* Card4 */}
            <div className="rounded-xl shadow-xl bg-gray-100">
              <div className="p-5 flex flex-col">
                <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/guarda3.jpg"
                  alt="Envios a todo el pais"
                  width={800}
                  height={400}
                  className="rounded-sm max-h-48"
                />
                </div>
                <h3 className="text-2xl font-medium mt-3 text-center">Conocé Hidralife.</h3>
                <p className="text-slate-500 text-lg mt-3 text-center">Descubre Hidralife: una sección exclusiva de nuestra marca¡Revitaliza tu rutina de cuidado personal con Hidralife!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>    
  );
};

export default Home; //Foto de <a href="https://unsplash.com/es/@shutter_speed_?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Bastian Riccardi</a> en <a href="https://unsplash.com/es/fotos/un-carrito-de-compras-de-juguete-BQ9usyzHx_w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
