import { useEffect, useState } from "react";
import Layout from "@components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import useCartStore from "@store/cart/useCartStore";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import { PrimeReactProvider} from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import useSiteConfigStore from "@store/siteConfig/useSiteConfigStore";       
import useLandingStore from "@store/landing/useLandingStore";
import usePermissionLevel from "app/hooks/usePermissionlevel";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { fetchCart } = useCartStore();
  const {fetchSiteConfig} = useSiteConfigStore();
  const { fetchLanding} = useLandingStore();
  const { authResponse, authLoading, authError } = usePermissionLevel();

  const router = useRouter();

  useEffect(() => {
    // if (!authLoading && (authError || (authResponse && !authResponse.admin))) {
    //   router.push('https://hidrasport.com.ar/');
    // }
  }, [authLoading, authResponse, authError, router]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchSiteConfig(), fetchCart(), fetchLanding()]);
      } catch (error) {
        toast.error("Error al cargar la información del sitio");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <> 
        <Layout loading={loading}>
        <PrimeReactProvider>
          <Component {...pageProps} />
        </PrimeReactProvider>
      </Layout>
    </>
  
  );
};
export default MyApp;
