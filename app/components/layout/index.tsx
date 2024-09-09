import Head from "next/head";
import React from "react";
import Navbar from "./contentMain/navbar";
import AuthModal from "./authmodal";
import { useAuthModalStore } from "@store/authModal.store";
import HydrationZustand from "./hydrationZustand";
import { useAuthStore } from "@store/auth/auth.store";
import Footer from "./contentMain/footer";
import { ToastContainer } from "react-toastify";
import Loader from "@components/common/Loader";

type LayoutProps = {
  loading: boolean;
  children: React.ReactNode;
};
const Layout = ({ children, loading }: LayoutProps) => {
  const { isOpen } = useAuthModalStore();
  const { isLogedIn } = useAuthStore();

  return (
    <HydrationZustand>
      <Head>
        <title>HidraSport - Indumentaria Deportiva</title>
        <meta name="description" content="Hidrasport ropa deportiva" />
        <link rel="icon" href="/tortuga_logo.png" />
      </Head>
      <Navbar />
      <main>
        {loading ? (
          <Loader />
        ) : (
          <>
            {isOpen && !isLogedIn() && <AuthModal />}
            {children}
          </>
        )}
        <ToastContainer />
      </main>

      <Footer />
    </HydrationZustand>
  );
};

export default Layout;
