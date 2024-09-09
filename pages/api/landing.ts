import { SERVER_URL } from "@config/index";
import urls from "@config/urls";
import { ILandigPage } from "@interfaces/hidraApi/landingPage";
import { Product } from "@interfaces/IProduct";
import { NextApiRequest, NextApiResponse } from "next";



export default async function getProducts(
    req: NextApiRequest,
    res: NextApiResponse) {
    if (req.method !== "GET")
        return res.status(405).json({ error: 'Method not allowed' });

    try {
        
        // Enviar la respuesta con las URLs actualizadas
        const dataLanding = await getLandingPageData();
        const dataSiteConfig = await getSiteConfiguration();        
        return res.status(200).json({...dataLanding, ...dataSiteConfig});
    } catch (err) {
        return res.status(407).json({
            message: 'Error cargando productos',
        });
    }
}

const getLandingPageData = async() => {
    const response = await fetch(urls.landingPage);
        const data = await response.json() as ILandigPage;

        // Actualizar las URLs de las imágenes en productosDestacados
        const updatedProductosDestacados = data.productosDestacados.map((product: Product) => ({
            ...product,
            images: product.images.map((img) => ({
                image: `${SERVER_URL}${img.image}`,
            })),
        }));

        // Actualizar las URLs de las imágenes en gridLinks
        const updatedGridLinks = data.gridLinks.map((link) => ({
            ...link,
            image: link.image.includes('http') ? link.image : `${SERVER_URL}${link.image}`,
        }));

        // Actualizar las URLs de las imágenes en infoCards
        const updatedInfoCards = data.infoCards.map((card) => ({
            ...card,
            image: card.image //card.image.includes('http') ? card.image : `${SERVER_URL}${card.image}`,
        }));

        // Actualizar la URL de la imagen en heroSection
        const updatedHeroSection = {
            ...data.heroSection,
            backgroundImage: data.heroSection.backgroundImage.includes('http') ? data.heroSection.backgroundImage : `${SERVER_URL}${data.heroSection.backgroundImage}`,
        };

        return {
            ...data,
            heroSection: updatedHeroSection,
            productosDestacados: updatedProductosDestacados,
            gridLinks: updatedGridLinks,
            infoCards: updatedInfoCards,
        }
}


interface IConfigSite {
    id?: number;
    banner: string;
    banner_md: string;
    banner_sm: string;
    email: string;
    address: string;
    phone: string;
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    banner_text: string;
    banner_below_text: string;
    promo_text: string;
    shipping_text: string;
    min_amount_discount_delivery: string;
    max_discount_in_delivery: string;
}

const getSiteConfiguration = async() => {
    const response = await fetch(urls.configSite);
        const responseServer = await response.json();
        const data = responseServer.results[0] as IConfigSite
        delete data.id
        return  {
            ...data,
            banner: data.banner.replace('http://localhost:8000', SERVER_URL),
            banner_md: data.banner_md.replace('http://localhost:8000', SERVER_URL),
            banner_sm: data.banner_sm.replace('http://localhost:8000', SERVER_URL),
        }

}