import MessageBar from "@components/layout/messagesBar";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
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
      className="w-full"
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
    <menu className="grid gap-1 grid-rows-1 grid-cols-4 m-5 h-fit ">
  {props.items.map((item, index: number) => (
    <Link
      href={item.link}
      className="relative opacity-90 h-fit m-2 border-2"
      key={index + item.label}
      style={{ position: 'relative' }}
    >
      <Image
        src={item.image}
        alt={item.label}
        width={400}
        height={400}
        className="rounded-lg blur-sm "
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
  if (!data && !error) return <Loader/>;
  if (error) {
    // guardar el error en un log
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
          "https://hidrasport.com.ar",
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
         // ajusta el alto según tus necesidades
        }}
        className="h-screen flex items-center justify-center"
      >
        {/* Aquí puedes agregar contenido encima de la imagen */}
        <div className="w-96 p-4 text-center  backdrop-blur-md bg-opacity-30  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

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
      <MessageBar
        messages={[
          "Envios en toda capital GRATIS",
          "Devoluciones sin cargo",
          "Cuotas sin interés 💳",
          "Más de 1000 productos 🛒 ",
        ]}
        delay={5000}
      />
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
