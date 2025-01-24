import { useEffect } from "react";
import MainLayout from "@components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import useCartStore from "@store/cart/useCartStore";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import useSiteConfigStore from "@store/siteConfig/useSiteConfigStore";
import useCategoriesStore from "@store/categories/categoriesStore";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { fetchCart } = useCartStore();
  const { fetchSiteConfig } = useSiteConfigStore();
  const { loadCategories} = useCategoriesStore();


  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchSiteConfig(),
          fetchCart(),
          loadCategories(),
        ]
        );
      } catch (error) {
        toast.error("Error al cargar la información del sitio");
        console.error("Error:", error);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <MainLayout>
        <PrimeReactProvider>
          <Component {...pageProps} />
        </PrimeReactProvider>
      </MainLayout>
    </>

  );
};
export default MyApp;
