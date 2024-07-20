import Head from "next/head";
import React from "react";
import Navbar from "./contentMain/navbar";
import AuthModal from "./authmodal";
import { useAuthModalStore } from "@store/authModal.store";
import HydrationZustand from "./hydrationZustand";
import { useAuthStore } from "@store/auth/auth.store";
import Footer from "./contentMain/footer";
import { ToastContainer } from "react-toastify";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const { isOpen } = useAuthModalStore();
  const { isLogedIn } = useAuthStore();

  return (
    <HydrationZustand>
      <Head>
        <title>HidraSport - Indumentaria Deportiva</title>
        <meta name="description" content="Hidrasport ropa deportiva" />
        <link rel="icon" href="/tortuga_logo.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Navbar />
      <main>
        {isOpen && !isLogedIn() && <AuthModal />}
        {children}
        <ToastContainer />
      </main>

      <Footer />
    </HydrationZustand>
  );
};

export default Layout;
