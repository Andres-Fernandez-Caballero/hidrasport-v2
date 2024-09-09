import { SERVER_URL } from "@config/index";
import urls from "@config/urls";
import { NextApiRequest, NextApiResponse } from "next";



export default async function getSiteConfigData(
    req: NextApiRequest,
    res: NextApiResponse) {
    if (req.method !== "GET")
        return res.status(405).json({ error: 'Method not allowed' });

    try {
        const dataSiteConfig = await getSiteConfiguration();        
        
        return res.status(200).json(dataSiteConfig);
    } catch (err) {
        return res.status(407).json({
            message: 'Error cargando productos',
        });
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