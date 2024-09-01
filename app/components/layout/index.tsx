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
  loading: boolean
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        { /*** PWA metadata  ***/}
        <link rel="manifest" href="manifest.json" />
        <meta name="application-name" content="Hidrasport APP" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hidrasport APP" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0C0A09" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="Hidrasport APP" />
        <meta name="twitter:description" content="Hidrasport ropa deportiva" />
        <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@AndresFernandez" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hidrasport APP" />
        <meta property="og:description" content="Hidrasport ropa deportiva" />
        <meta property="og:site_name" content="Hidrasport APP" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />

      </Head>
      <Navbar />
      <main>
        {loading ?
          <Loader />
          :
          <>
            {isOpen && !isLogedIn() && <AuthModal />}
            {children}
          </>
        }
        <ToastContainer />
      </main>

      <Footer />
    </HydrationZustand>
  );
};

export default Layout;
