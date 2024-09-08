import { HeroSection as HeroSectionProps } from "@interfaces/hidraApi/landingPage";
import styles from "./styles.module.css";
import { Divider } from "primereact/divider";
import { Button } from 'primereact/button';
import Link from "next/link";
import Image from "next/image";

const HeroSection = (props: HeroSectionProps) => (
    <section style={{ height: '100vh' }}>
        <div className="flex justify-end">
            <BackgroundImage backgroundImage={props.backgroundImage} />
            <RightSide />
        </div>
        <Messages />
        <HeroFooter />
    </section>
);


//========================= Interfaces ============================
interface BackgroundImageProps {
    backgroundImage: string;
}

//========================= Components ============================


const BackgroundImage = (props: BackgroundImageProps) => (
    <div className="relative w-full h-full" style={{ height: '70vh' }}>
    <Image
      alt="HidrasportHero"
      src={props.backgroundImage}
      layout="fill"  // Usa fill para que la imagen cubra todo el contenedor
      objectFit="cover"  // Reemplaza `object-cover` por `objectFit` de Next.js
      quality={80}
      priority={true}  // Marca la imagen como prioritaria para mejorar LCP
    />
  </div>
);

const RightSide = () => (
    <div className={styles.heroTextContainer}>
        <h2 className={styles.heroText}>
            <span>FLUÍ </span><br/>
            CON <br />
            NOSOTROS
        </h2>
    </div>
);

const Messages = () => (
    <div className={styles.messagesContainer}>
        <h3>3 Cuotas sin interés</h3>
        <Divider layout="vertical" />
        <h3>Envíos Gratis apartir de $40.000 </h3>
        <Divider layout="vertical" />
        <h3>Devoluciones sin cargo</h3>
    </div>
);

const HeroFooter = () => (
    <div className={styles.heroFooterContainer}>
        <Link href={'/productos'}>
            <Button icon="pi pi-arrow-right" className={styles.heroFooterButton} label="Productos" />
        </Link>
    </div>
);


export default HeroSection;
