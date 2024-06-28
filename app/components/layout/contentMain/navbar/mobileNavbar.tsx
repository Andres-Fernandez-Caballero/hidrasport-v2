import Image from "next/image";
import Link from "next/link";
import { MobileNavbarProps } from ".";
import { useAuthStore } from "@store/auth/auth.store";
import { GoPerson } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";

const MobileNavbar = ({
  isOpen,
  toggleMobileMenuClose,
  links,
  openModal,
}: MobileNavbarProps) => {
  const { logout, isLogedIn } = useAuthStore();

  return (
    <nav
      className={`lg:hidden ${isOpen ? "block" : "hidden"}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 z-10"></div>
      <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="/carrito">
            <FaCartShopping className="text-blue-500 text-2xl" />
          </Link>
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HidraSport</span>
            <Image
              width={100}
              height={100}
              className="h-8 w-auto"
              src="/images/hidraLogo.png"
              alt="tortuga tribal"
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={toggleMobileMenuClose}
          >
            <span className="sr-only">Close menu</span>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <nav className="space-y-2 py-6">
              {links.map((link, index) => (
                <Link
                  key={index}
                  onClick={toggleMobileMenuClose}
                  href={link.url}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    link.colorText ?? "text-gray-900"
                  } hover:bg-gray-50`}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
            <nav className="py-6">
              {isLogedIn() ? (
                <div className="flex flex-row gap-4">
                  <Link
                    href="/profile"
                    className="text-2xl font-semibold leading-6 text-gray-900"
                  >
                    <GoPerson />
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm font-semibold leading-6 text-gray-500 hover:text-rose-400"
                  >
                    Logout{" "}
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={openModal}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
