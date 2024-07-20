import { useAuthModalStore } from "@store/authModal.store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNavbar from "./mobileNavbar";
import DescktopNavbar from "./descktopNavbar";
import { useRouter } from "next/router";
import { ILink } from "@interfaces/ILink";


interface LinkItem  extends ILink {}

export const links: LinkItem[] = [
  { url: "/productos", text: "Productos" },
  { url: "/productos/categoria/Mujer", text: "Mujeres" },
  { url: "/productos/categoria/Hombre", text: "Hombres" },
  { url: "/productos/categoria/Deportes", text: "Deportes" },
];

export const hidraLifeLink: LinkItem ={
  url: "/productos/hidralife", text: "Hidralife"
}

interface NavbarProps {
  links: LinkItem[];
  openModal: () => void;
}
export interface MobileNavbarProps extends NavbarProps {
  isOpen: boolean;
  toggleMobileMenuClose: () => void;
}
export interface DescktopNavbarProps extends NavbarProps {
  className?: string;
}

const Navbar = () => {
  const { openModal } = useAuthModalStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenuClose = () => {
    setIsOpen(false);
  };

  const {asPath} = useRouter();
  
  console.log('url: ', asPath);
  

  return (
    <header className={'fixed z-10 w-svw bg-stone-950'}>
      <nav
        className={ `mx-auto flex max-w-7xl items-center justify-between py-1 px-3 lg:px-8"
        aria-label="Global`}
      >
        
       {/* burguer button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-between rounded-md p-2.5 text-gray-700"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
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
        

        {/* Brand */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 hover:scale-110 ease-in-out duration-150">
            <span className="sr-only">Hidra</span>
            <figure className="flex items-center">
              <Image
              //Cambiar logo
                height={800}
                width={800}
                className="h-10 w-auto m-1"
                src={asPath===hidraLifeLink.url?"/images/hidralife.png":"/images/hidraLogo.png"}
                alt="Logo Hidra Sport"
              />
            </figure>
          </Link>
        </div>

        {/* Profile and Cart */}
        <div className="inline-flex">
        <button
            type="button"
            className="inline-flex items-center justify-between rounded-md p-1.5 text-white"
            onClick={toggleMobileMenu}
          >
            <span className="pi pi-user"/>
          </button>
          <button
            type="button"
            className="-flex items-center justify-between rounded-md p-1.5 text-white"
            onClick={toggleMobileMenu}
          >
            <span className="pi pi-shopping-cart"/>
          </button>
        </div>


        {/* show on md and biggest on */}
        <DescktopNavbar links={links} openModal={openModal} />
        {/* show only un smalls screens */}
        <MobileNavbar
          links={links}
          openModal={openModal}
          isOpen={isOpen}
          toggleMobileMenuClose={toggleMobileMenuClose}
        />
      </nav>
    </header>
  );
};

export default Navbar;
