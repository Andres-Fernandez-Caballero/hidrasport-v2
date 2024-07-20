import { LinkImage } from "@interfaces/ILink";
import { Product } from "@interfaces/IProduct";


export interface InfoCardData {
    title: string;
    text: string;
    image: string;
}

export interface HeroSection {
    title: string;
    subtitle: string;
    backgroundImage: string;
    messages: string[];
}

export interface ILandigPage {
    heroSection: HeroSection;   
    productosDestacados: Product[]
    gridLinks: LinkImage[]
    infoCards: InfoCardData[];
}