import type { NextPage } from "next";
import React from "react";
import "react-multi-carousel/lib/styles.css"; // Import styles for the carousel
import useSWR from "swr";
import Loader from "@components/common/Loader";
import HeroSection from "@components/layout/landing/heroSection";
import CategoriesSection from "@components/layout/landing/categoriesSection";
import CarouselProducts from "@components/layout/carouselProducts";
import InfoCardsHome from "@components/layout/landing/infocardsHome";
import { ILandigPage } from "@interfaces/hidraApi/landingPage";
import urls from "@config/urls";


const fetcher = (url: string): Promise<ILandigPage> =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw Error("Error al cargar los datos");
      return res.json();
    })

const Home: NextPage = () => {
  const { data, error } = useSWR(
    //`${SERVER_URL}/api/store/site-configuration/`,
    urls.landingPage,
    fetcher,
  );

  if (!data && !error) return <Loader />;
  if (error) console.error(error);

  return (
    <main>
      <HeroSection
        backgroundImage={data?.heroSection.backgroundImage ?? ''}
        subtitle={data?.heroSection.subtitle ?? ''}
        title={data?.heroSection.title ?? ''}
        messages={data?.heroSection.messages ?? []}
      />
      <CategoriesSection/>

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