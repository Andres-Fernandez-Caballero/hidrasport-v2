import type { NextPage } from "next";
import React from "react";
import "react-multi-carousel/lib/styles.css"; // Import styles for the carousel
import useSWR from "swr";
import Loader from "@components/common/Loader";
import HeroSection from "@components/layout/landing/heroSection";
import CategoriesSection from "@components/layout/landing/categoriesSection";
import ProductsSection from "@components/layout/landing/notableProductsSection";
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
    '/api/landing',
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
      <CategoriesSection />
      <ProductsSection products={data?.productosDestacados ?? []} />
    </main>
  );
};

export default Home;