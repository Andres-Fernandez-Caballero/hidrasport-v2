import type { NextPage } from "next";
import React from "react";
import "react-multi-carousel/lib/styles.css"; // Import styles for the carousel
import HeroSection from "@components/layout/landing/heroSection";
import CategoriesSection from "@components/layout/landing/categoriesSection";
import ProductsSection from "@components/layout/landing/notableProductsSection";
import useLandingStore from "@store/landing/useLandingStore";

const Home: NextPage = () => {
  const { landing} = useLandingStore();
  
  return (
    <>
      <HeroSection
        backgroundImage={landing.heroSection.backgroundImage}
        subtitle={landing.heroSection.subtitle}
        title={landing.heroSection.title }
        messages={landing.heroSection.messages}
      />
      <CategoriesSection />
      <ProductsSection products={landing.productosDestacados} />
    </>
  );
};

export default Home;