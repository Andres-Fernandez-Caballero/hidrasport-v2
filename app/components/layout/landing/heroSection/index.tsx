import { HeroSection as HeroSectionProps } from "@interfaces/hidraApi/landingPage";
import styles from "./styles.module.css";
import { Divider } from "primereact/divider";
import { Button } from 'primereact/button';

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
    <div className="relative w-full h-full">
        <img 
            src={props.backgroundImage} 
            alt="Background Natacion" 
            className="w-full h-full object-cover" 
            style={{ height: '70vh' }}
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
        <Button icon="pi pi-arrow-right" className={styles.heroFooterButton} label="Productos"></Button>
    </div>
);


export default HeroSection;
