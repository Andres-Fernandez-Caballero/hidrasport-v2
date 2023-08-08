import Link from "next/link";
import Image from "next/image";
import { DescktopNavbarProps, links } from ".";
import { useAuthStore } from "@store/auth.store";

const DescktopNavbar = ({openModal}: DescktopNavbarProps)=> {
    const {isLogedIn, logout, userSession} = useAuthStore()
    return(
        <>
            <div className="hidden lg:flex lg:gap-x-12">
              {links.map(link => (
                <Link
                    key={link.url}
                    href={link.url}
                    className={`text-sm font-semibold leading-6 ${link.colorText ?? "text-gray-900"}`}
                >
                    {link.text}
                </Link>

              ))}
              {userSession.admin ?
                  <Link href="/tools" className={`text-sm font-semibold leading-6 "text-gray-900"`}>
                    Herramientas
                  </Link>
                : null
              }
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
              <Link href="/carrito">
                <i className="fa-solid fa-cart-shopping fa-2xl text-blue-500"></i>
              </Link>
                {isLogedIn() ? (
                    <div className="flex items-center justify-end gap-x-4">
                        <Link href="/profile" className="text-sm font-semibold leading-6 text-gray-900">
                            {userSession.username}
                        </Link>
                        <button
                            onClick={logout}
                            className="text-sm font-semibold leading-6 text-gray-500 hover:text-rose-400"
                        >
                            Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </div>
                ) : (
              <button onClick={openModal} className="text-sm font-semibold leading-6 text-gray-900">
                Login / Registro
              </button>
              )}
            </div>
        </>
    )
}


export default DescktopNavbar;