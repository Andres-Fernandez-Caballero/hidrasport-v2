import { useEffect } from "react";
import Layout from "@components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import useCartStore from "@store/cart/useCartStore";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import CardProile from "@components/common/cards/cardProfile";
import { PrimeReactProvider} from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import useSiteConfigStore from "@store/siteConfig/useSiteConfigStore";
        

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { fetchCart } = useCartStore();
  const {fetchSiteConfig} = useSiteConfigStore();
  useEffect(() => {
    try {
      fetchSiteConfig().catch(error => {
        toast.error("Error al cargar la información del sitio");
        console.log("error", error);
      });

      fetchCart();

    } catch (error) {
      toast.error((error as Error).message);
      console.log("error", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CardProile]);
  
  return (
    <Layout>
      <PrimeReactProvider>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </Layout>
  );
};
export default MyApp;
