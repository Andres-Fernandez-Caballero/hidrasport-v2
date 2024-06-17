import Image from "next/image";
import MessageBar from "./messageBar";
import { HeroSection } from "@interfaces/hidraApi/landingPage";


interface LeftSideProps {
    title: string;
    messages: string[];
    subtitle: string;
}

interface RightSideProps {
    accentImage: string;
}

interface BackgroundImageProps {
    backgroundImage: string;
}

const BackgroundImage = (props: BackgroundImageProps) => (
    <div 
        className="absolute bg-cover inset-0 bg-center  blur-sm" 
        style={{
            backgroundImage: `url(${props.backgroundImage})`
        }}>
    </div>

)

const LetfSide = (props: LeftSideProps) => (
    <div className="flex flex-col justify-center items-center">
        {/* Contenido de la columna izquierda (información) */}
        <header className="rounded-md text-center p-2 m-2  bg-opacity-75">
            <h2 className="text-4xl font-bold text-white m-4">{props.title}</h2>
            <p className="text-center m-4 text-xl text-white">{props.subtitle}</p>
            <MessageBar
                messages={props.messages}
                delay={5000}
            />
            <button type="button" className="text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none hover:scale-105 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">¡Nuestros productos!</button>
        </header>
    </div>
)

const RightSide = (props: RightSideProps) => (
    <figure className="z-10 p-6 m-6 opacity-75">
        <Image src={props.accentImage} alt="accent image" className="mb-4" width={500} height={500} />
    </figure>
)

const HeroSection = (props: HeroSection) => (
    <section
        className="relative h-screen flex items-center gap-2 justify-center overflow-hidden"
    >
        <BackgroundImage {...props} />

        <div className="z-10 w-full ml-8">
            <LetfSide {...props} />
        </div>
        <div className="z-10 w-1/2 mr-8">
            <RightSide {...props} />
        </div>
    </section >
)

export default HeroSection;