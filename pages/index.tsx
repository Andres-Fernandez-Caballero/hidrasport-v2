import type { NextPage } from "next";
import "react-multi-carousel/lib/styles.css"; // Import styles for the carousel
import HeroSection from "@components/layout/landing/heroSection";
import useLandingStore from "@store/landing/useLandingStore";
import CategoriesSection from "@components/layout/landing/categoriesSection";
import ProductsSection from "@components/layout/landing/notableProductsSection";
import useProducts from "app/hooks/useProducts";
import { useEffect } from "react";

const Home: NextPage = () => {
 const { landing, fetchLanding} = useLandingStore();

  const { products} = useProducts({bestof: true});

  useEffect(() => {
    fetchLanding().then();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  
  return (
    <>
      <HeroSection
        backgroundImage={landing.heroSection.backgroundImage}
        slogan={landing.heroSection.slogan }
        messages={landing.heroSection.messages}
      />
      <CategoriesSection />
      <ProductsSection products={products} />
    </>
  );
};

export default Home;