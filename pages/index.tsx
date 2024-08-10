import type { NextPage } from "next";
import React from "react";
import "react-multi-carousel/lib/styles.css"; // Import styles for the carousel
import HeroSection from "@components/layout/landing/heroSection";
import CategoriesSection from "@components/layout/landing/categoriesSection";
import ProductsSection from "@components/layout/landing/notableProductsSection";
import useSiteConfigStore from "@store/siteConfig/useSiteConfigStore";


const Home: NextPage = () => {
  const {siteConfig} = useSiteConfigStore();
  return (
    <main>
      <HeroSection
        backgroundImage={siteConfig.heroSection.backgroundImage}
        subtitle={siteConfig.heroSection.subtitle}
        title={siteConfig.heroSection.title }
        messages={siteConfig.heroSection.messages}
      />
      <CategoriesSection />
      <ProductsSection products={siteConfig.productosDestacados} />
    </main>
  );
};

export default Home;