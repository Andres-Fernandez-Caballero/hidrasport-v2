import Image from "next/image";
import Link from "next/link";
import { MobileNavbarProps } from ".";
import { useAuthStore } from "@store/auth/auth.store";
import { GoPerson } from "react-icons/go";
import styles from "./styles.module.css"
import useSiteConfigStore from "@store/siteConfig/useSiteConfigStore";

const MobileNavbar = ({
  isOpen,
  toggleMobileMenuClose,
  links,
  openModal,
}: MobileNavbarProps) => {
  const { logout, isLogedIn } = useAuthStore();
  const { siteConfig } = useSiteConfigStore()
  return (
    <nav
      className={`${isOpen ? "block" : "hidden"}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 z-10 backdrop-blur-[2px]"
      onClick={toggleMobileMenuClose}
      />
      <div className={styles.mobileNavbarContainer}>
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HidraSport</span>
            <Image
              width={100}
              height={100}
              className="h-8 w-auto"
              src="/images/hidraLogo.svg"
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
              stroke="white"
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
              {links?.map((link, index) => (
                <Link
                  key={index}
                  onClick={toggleMobileMenuClose}
                  href={link.url}
                  className={`-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 hover:bg-gray-700`}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
            <nav className="py-2">
              {isLogedIn() ? (
                <div className="flex w-100 justify-between">
                  <Link
                    href="/profile"
                    className="text-2xl font-semibold leading-6 text-gray-900"
                  >
                    <GoPerson />
                  </Link>
                  <hr />
                  <button
                    onClick={logout}
                    className="text-sm font-semibold leading-6 text-gray-500 hover:text-rose-400"
                  >
                    Logout{" "}
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </button>
                </div>
              ) : (
                <div className="flex w-100 justify-center">
                  <hr />
                  <button
                    onClick={openModal}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 border-gray-50 text-gray-300 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </button>
                </div>
                
              )}
            </nav>
            <nav className="absolute bottom-6 w-100 align-center">
              <div className="flex flex-col w-100 justify-center text-center ">
                
                <Link
                    href={ siteConfig.instagram }
                    className="font-semibold leading-6 text-gray-50"
                  >
                    <i className="pi pi-instagram mr-1.5"/>
                     Instagram
                  </Link>
                  <br />
                  <Link
                    href={ siteConfig.facebook }
                    className="font-semibold leading-6 text-gray-50"
                  > 
                    <i className="pi pi-facebook mr-1.5"/>
                    Facebook
                  </Link>
                  <br />

                  <Link
                    href={siteConfig.phone}
                    className="font-semibold leading-6 text-gray-50"
                  >
                    <i className="pi pi-whatsapp mr-1.5"/>
                    WhatsApp
                  </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
