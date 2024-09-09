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
        const dataLanding = await getLandingPageData();      
        return res.status(200).json(dataLanding);
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