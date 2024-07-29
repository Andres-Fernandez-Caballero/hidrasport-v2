import { WHATSAPP_BUSINESS_NUMBER } from "@config/index";
import {
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import AFIP from "./Afip";

const About = () => {
  return (
    <section className="w-full md:w-4/12 px-4  text-center">
      <ul className="mb-4">
        <li className="flex items-center mb-2 justify-center">
          <FaPhone className="mr-2" width={50} />
          <a href="#"> Telefono: +{WHATSAPP_BUSINESS_NUMBER} </a>
        </li>
        <li className="flex items-center mb-2 justify-center">
          <FaEnvelope className="mr-2" width={50} />
          <a href="#">Email: </a>
        </li>
      </ul>
    </section>
  );
};

const RedesSociales = () => {
  return (
    <section className="w-full md:w-4/12 px-4  text-center">
      <ul className="mb-4">
        <li className="flex items-center justify-center mb-2">
          <FaFacebook width={50} className="mr-2" />
          <a href="http://facebook.com">Facebook</a>
        </li>
        <li className="flex items-center justify-center mb-2">
          <FaInstagram width={50} className="mr-2" />
          <a href="http://instagram.com">Instagram</a>
        </li>
      </ul>
    </section>
  );
};

const AFIPColum = () => {
  return (
    <section className="w-full md:w-4/12 px-4 flex justify-center mx-autok">
      <div className="flex flex-col items-center justify-center text-center">
        <AFIP />
        <span className="flex items-center flex-col">Hidrasport ®2023</span>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="relative bg-cover bg-center text-white bg-gray-950 flex justify-center">
    <div className="absolute inset-0 backdrop-blur-sm"></div>
    <div className="relative container mx-auto flex flex-wrap py-8">
      <About />
      <RedesSociales />
      <AFIPColum />
    </div>
  </footer>
  );

export default Footer;



{/* bg-[url('/images/arena.jpg')]*/}