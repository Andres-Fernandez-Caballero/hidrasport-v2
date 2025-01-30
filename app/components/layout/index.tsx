import React from "react";
import Head from "next/head";
import Navbar from "./contentMain/navbar";
import SearchBar from "@components/common/searchbar";
import Footer from "./contentMain/footer";
import { useAuthModalStore } from "@store/authModal.store";
import { useAuthStore } from "@store/auth/auth.store";
import HydrationZustand from "./hydrationZustand";
import AuthModal from "./authmodal";
import Loader from "@components/common/Loader";
import { ToastContainer } from "react-toastify";
import { useSearchBar } from "@store/searchBar.store";

type LayoutProps = {
  loading?: boolean;
  children: React.ReactNode;
};

const Layout = ({ children, loading = false }: LayoutProps) => {
  const { isOpen } = useAuthModalStore();
  const { isLogedIn } = useAuthStore();
  const { searchBarIsOpen } = useSearchBar();
 

  return (
    <HydrationZustand>
      <Head>
        <title>HidraSport - Indumentaria Deportiva</title>
      </Head>
      <Navbar />
      <SearchBar />
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
