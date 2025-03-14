import { useAuthModalStore } from "@store/authModal.store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNavbar from "./mobileNavbar";
import { useRouter } from "next/router";
import { ILink } from "@interfaces/ILink";
import useCartStore from "@store/cart/useCartStore";
import { useAuthStore } from "@store/auth/auth.store";
import { useSearchBar } from "@store/searchBar.store";
import useCategoriesStore from "@store/categories/categoriesStore";
import { Button } from "primereact/button";

export const hidraLifeLink: {url:string, text:string} = {
  url: "/productos/hidralife",
  text: "Hidralife",
};

interface NavbarProps {
  links?: ILink[];
  openModal?: () => void;
}

export interface MobileNavbarProps extends NavbarProps {
  isOpen: boolean;
  toggleMobileMenuClose: () => void;
}


export interface DescktopNavbarProps extends NavbarProps {
  className?: string;
}

const Navbar = () => {
  const { searchBarIsOpen, toggleSearchBar } = useSearchBar();
  const { openModal } = useAuthModalStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLogedIn, logout } = useAuthStore();
  const { cartData } = useCartStore();
  const { asPath } = useRouter();
  const router = useRouter();
  const { categories, subCategoriesByCategory } = useCategoriesStore();

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    if(searchBarIsOpen) toggleSearchBar();
  };

  const toggleMobileMenuClose = () => {
    setIsOpen(false);
  };


  function handleClick(url:string) {
    router.push(url);
    toggleMobileMenuClose();
  }

  const linkRenderer = (item, options) =>(
    <span 
      className="`-mx-3 flex justify-between rounded-lg px-3 text-base font-semibold leading-7 hover:bg-gray-700`"
      onClick={options.onClick}
      >
      <Button onClick={() => handleClick(item.url)} className={`mx-2 w-[100%] ${item.items && 'font-semibold'}`}>{item.label}</Button>
      {item.items?.length != 0 && item.items && <Button icon="pi pi-chevron-down"/>}
    </span>
  )

  /**
   * Links for the Navbar
   * Se cargan los links de las categorias a trabes del hook useCategoriesStore
   * las categorias deben usar la url /productos/categoria/[categoria]
   * los subcategories deben usar la url /productos/[categoria]/[subcategoria]
   * a su vez se cargan los subcategories de cada categoria
   * 
   * @type {ILink[]}
   * 
   */
  const links: ILink[] = [
    { url: "/productos", label: "Productos", template:linkRenderer },
    { url: "/productos/destacados", label: "Destacados ⭐", template:linkRenderer },
    ...categories.map(category => ({ 
      url: `/productos/categoria/${category.name}`, 
      label: category.name,
      template:linkRenderer,
      items: subCategoriesByCategory(category.name).map(subCategory => ({
        url: subCategory.url,
        label: subCategory.label,
        items: subCategory.items,
        template:linkRenderer
      })),
     })),
  ];

  

  return (
    <header className={`fixed z-10 w-svw bg-stone-950`}>
      <nav className="flex items-center justify-between py-1 px-6 lg:px-8" aria-label="Global">
        {/* Burger Button */}
        <button type="button" className="rounded-md p-2.5" onClick={toggleMobileMenu}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Brand */}
        <div className="flex">
          <Link href="/" className="-m-1.5 p-1.5 hover:scale-110 ease-in-out duration-150">
            <span className="sr-only">Hidra</span>
            <figure className="flex items-center">
              <Image
                height={800}
                width={800}
                className="h-10 w-auto m-1"
                src={asPath === hidraLifeLink.url ? "/images/hidralife.png" : "/images/hidraLogo.svg"}
                alt="Logo Hidra Sport"
                priority
              />
            </figure>
          </Link>
        </div>

        {/* Profile, Cart, and Search Button */}
        <div className="inline-flex gap-x-4 items-center">
          <button onClick={toggleSearchBar} className="text-white text-xl p-2.5 hover:scale-125 ease-in-out duration-150">
            {!searchBarIsOpen  && <i className="pi pi-search" aria-hidden="true"></i>}
          </button>

          <Link href="/carrito">
            <span className="relative inline-block">
              <span className="pi pi-shopping-cart text-white text-xl" />
              {cartData.length >= 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartData.length}
                </span>
              )}
            </span>
          </Link>

          {isLogedIn() ? (
            <div className="flex items-center justify-end gap-x-2">
              <Link href="/profile" className="text-2xl leading-6">
                <div className="flex flex-row hover:scale-125 ease-in-out duration-150">
                  <span className="pi pi-user text-white text-xl" />
                </div>
              </Link>
              <button
                onClick={logout}
                className="text-xs font-bold leading-6 hover:scale-125 ease-in-out duration-150 text-white"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-xl"></i>
              </button>
            </div>
          ) : (
            <button
              onClick={openModal}
              className="text-xs leading-6 hover:scale-125 ease-in-out duration-150 ml-8"
            >
              <span className="pi pi-user text-white text-xl" />
            </button>
          )}
        </div>
      </nav>

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
