import { LinkImage } from "@interfaces/ILink";


export interface InfoCardData {
    title: string;
    text: string;
    image: string;
}

export interface HeroSection {
    slogan: string;
    subtitle?: string;
    backgroundImage: string;
    messages: string[];
}

export interface ILandigPage {
    heroSection: HeroSection;
    gridLinks: LinkImage[]
    infoCards: InfoCardData[];
}