import { useAuthModalStore } from "@store/authModal.store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNavbar from "./mobileNavbar";
import DescktopNavbar from "./descktopNavbar";

interface LinkItem {
  url: string;
  text: string;
  colorText?: string;
}

export const links: LinkItem[] = [
  { url: "/productos", text: "Productos" },
  { url: "/productos/Mujer", text: "Mujeres" },
  { url: "/productos/Hombre", text: "Hombres" },
  { url: "/productos/Deportes", text: "Deportes" },
  {
    url: "/productos/guardavidas",
    text: "Guardavidas +",
    colorText: "text-red-500",
  },
];

interface NavbarProps {
  links: LinkItem[];
  openModal: () => void;
}
export interface MobileNavbarProps extends NavbarProps {
  isOpen: boolean;
  toggleMobileMenuClose: () => void;
}
export interface DescktopNavbarProps extends NavbarProps {}

const Navbar = () => {
  const { openModal } = useAuthModalStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenuClose = () => {
    setIsOpen(false);
  };
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Hidra</span>
            <figure className="flex items-center">
              <Image
                height={600}
                width={600}
                className="h-12 w-auto"
                src="/images/tortuga_logo.png"
                alt=""
              />
              <Image
                height={600}
                width={600}
                className="h-10 w-auto"
                src="/images/hidraLogo.png"
                alt=""
              />
            </figure>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <DescktopNavbar links={links} openModal={openModal} />
      </nav>
      {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
      <MobileNavbar
        links={links}
        openModal={openModal}
        isOpen={isOpen}
        toggleMobileMenuClose={toggleMobileMenuClose}
      />
    </header>
  );
};

export default Navbar;
