import type { NextPage } from "next";
import React from "react";
import "react-multi-carousel/lib/styles.css"; // Import styles for the carousel
import useSWR from "swr";
import { landingPageUrl } from "@config/index";
import Loader from "@components/Loader";
import HeroSection from "@components/layout/landing/heroSection";
import CarouselProducts from "@components/carouselProducts";
import BannerHome from "@components/layout/landing/bannerHome";
import InfoCardsHome from "@components/layout/landing/infocardsHome";
import { ILandigPage } from "@interfaces/hidraApi/landingPage";


const fetcher = (url: string): Promise<ILandigPage> =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw Error("Error al cargar los datos");
      return res.json();
    })

const Home: NextPage = () => {
  const { data, error } = useSWR(
    //`${SERVER_URL}/api/store/site-configuration/`,
    landingPageUrl,
    fetcher,
  );

  if (!data && !error) return <Loader />;
  if (error) console.error(error);

  return (
    <main>
      <HeroSection
        accentImage={data?.heroSection.accentImage ?? ''}
        backgroundImage={data?.heroSection.backgroundImage ?? ''}
        subtitle={data?.heroSection.subtitle ?? ''}
        title={data?.heroSection.title ?? ''}
        messages={data?.heroSection.messages ?? []}
      />

      <section className="flex">
        <div className="hidden sm:flex justify-center mx-auto h-fit">
          <BannerHome items={data?.gridLinks ?? []}  />
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
        <CarouselProducts products={data?.productosDestacados ?? []} />
      </section>

      {/* Info cards */}
      <section>
        <div className="flex items-center justify-center m-10  container mx-auto ">
          <InfoCardsHome
            items={data?.infoCards ?? []}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;