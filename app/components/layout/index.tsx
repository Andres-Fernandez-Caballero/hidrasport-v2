import React from "react";
import Head from "next/head";
import Navbar from "./contentMain/navbar";
import SearchBar from "@components/common/searchbar";
import { useAuthModalStore } from "@store/authModal.store";
import { useAuthStore } from "@store/auth/auth.store";
import HydrationZustand from "./hydrationZustand";
import AuthModal from "./authmodal";
import Loader from "@components/common/Loader";
import { ToastContainer } from "react-toastify";

type LayoutProps = {
  loading?: boolean;
  children: React.ReactNode;
};

const Layout = ({ children, loading = false }: LayoutProps) => {
  const { isOpen } = useAuthModalStore();
  const { isLogedIn } = useAuthStore();
 

  return (
    <HydrationZustand>
      <Head>
        <title>HidraSport - Indumentaria Deportiva</title>
      </Head>
      <Navbar />
      <SearchBar />
      <main className="min-h-screen">
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
    </HydrationZustand>
  );
};

export default Layout;