import { useEffect } from "react";
import Layout from "../components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import useCartStore from "@store/useCartStore";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { fetchCart, cartData } = useCartStore();
  useEffect(() => {
    try {
      fetchCart();
      toast.success(
        "Carrito cargado correctamente items cargados: " + cartData.length,
        { autoClose: 2000 },
      );
    } catch (error) {
      toast.error((error as Error).message);
      console.log("error", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
export default MyApp;
