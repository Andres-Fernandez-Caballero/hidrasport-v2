import Link from "next/link";
import { DescktopNavbarProps, hidraLifeLink, links } from ".";
import { useAuthStore } from "@store/auth.store";
import { GoPerson } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import useCartStore from "@store/cart/useCartStore";

const DescktopNavbar = ({ openModal }: DescktopNavbarProps) => {
  const { isLogedIn, logout, userSession } = useAuthStore();
  const { cartData } = useCartStore();
  return (
    <>
      <div className="hidden lg:flex lg:gap-x-8 justify-center items-center ">
        { links.map((link) => (
          <Link
            key={link.url}
            href={link.url} 
            className="text-lg font-semibold leading-6 hover:scale-110 ease-in-out duration-150 text-gray-900"
          >
            {link.text}
          </Link>
        )) }
          <Link
            href={hidraLifeLink.url }
            className="bg-red-500 rounded-full p-2 px-3 text-lg font-semibold leading-6 hover:scale-110 ease-in-out duration-150 text-white"
          >
            { hidraLifeLink.text}
          </Link>
        {userSession.admin ? (
          <Link
            href="/tools"
            className={`text-sm font-semibold leading-6 "text-gray-900 "`}
          >
            Herramientas
          </Link>
        ) : null}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
        <Link href="/carrito">
          <span className="relative inline-block">
            <FaCartShopping className="text-blue-500 text-2xl" />
            {cartData.length >= 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartData.length}
              </span>
            )}
          </span>
        </Link>
        <div className="ml-6">
        {isLogedIn() ? (
          <div className="flex items-center justify-end gap-x-2">
            <Link
              href="/profile"
              className="text-2xl leading-6"
            >
              <div className="flex flex-row hover:scale-125 ease-in-out duration-150">
                <GoPerson />
                <span className="text-sm font-bold mr-4">{userSession.username}</span>
              </div>
            </Link>
            <button
              onClick={logout}
              className="text-xs font-bold leading-6 hover:scale-125 ease-in-out duration-150"
            >
              Cerrar sesión <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        ) : (
          <button
            onClick={openModal}
            className="text-xs leading-6 hover:scale-125 ease-in-out duration-150 ml-8"
          >
            Login / Registro
          </button>
        )}
        </div>
      </div>
    </>
  );
};

export default DescktopNavbar;
