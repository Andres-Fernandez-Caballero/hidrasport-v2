import {
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import AFIP from "./Afip";
import useSiteConfigStore from "@store/siteConfig/useSiteConfigStore";
import { FaTwitter, FaYoutube } from "react-icons/fa";

const About = () => {
  const {siteConfig} = useSiteConfigStore();
  return (
    <section className="w-full md:w-4/12 px-4  text-center">
      <ul className="mb-4">
        <li className="flex items-center mb-2 justify-center">
          <FaPhone className="mr-2" width={50} />
          <a href="#"> Telefono: {siteConfig.phone} </a>
        </li>
        <li className="flex items-center mb-2 justify-center">
          <FaEnvelope className="mr-2" width={50} />
          <EmailLink
            email={siteConfig.email}
            subject="consulta/contacto"
            message={`
              Hola,

Me gustaría obtener más información sobre un producto o servicio. 
[nombre del cliente]
              `}
          >Email: {siteConfig.email}</EmailLink>
        </li>
      </ul>
    </section>
  );
};

const RedesSociales = () => {
  const {siteConfig} = useSiteConfigStore();
  return (
    <section className="w-full  md:w-4/12 px-4  text-center ">
      <ul className="mb-4 grid grid-cols-2">
       
        <li className="flex items-center justify-center mb-2">
          <FaInstagram width={50} className="mr-2" />
          <a href={siteConfig.instagram}>Instagram</a>
        </li>

        <li className="flex items-center justify-center mb-2">
          <FaFacebook width={50} className="mr-2" />
          <a href={siteConfig.facebook}>Facebook</a>
        </li>

        <li className="flex items-center justify-center mb-2">
          <FaYoutube width={50} className="mr-2" />
          <a href={siteConfig.youtube}>Youtube</a>
        </li>
        
        <li className="flex items-center justify-center mb-2">
          <FaTwitter width={50} className="mr-2" />
          <a href={siteConfig.twitter}>Twitter</a>
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
        <span className="flex items-center flex-col">Hidrasport ®{(new Date()).getFullYear()}</span>
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

  interface EmailLinkProps {
    children: React.ReactNode;
    email: string;
    subject: string;
    message: string;
  }

  const EmailLink = ({email, subject, message, children}: EmailLinkProps) => (
    <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}>{children}</a>

  )
  
  

export default Footer;



{/* bg-[url('/images/arena.jpg')]*/}