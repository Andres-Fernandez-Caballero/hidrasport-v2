import urls from "@config/urls";
import { SiteConfig } from "./siteConfig.contracts";
import { IConfigSite } from "@interfaces/hidraApi/siteConfig";

export const fetchSiteConfig = async (): Promise<SiteConfig> => {
    return getSiteConfiguration();
}


const getSiteConfiguration = async () => {
    const response = await fetch(urls.configSite);
    const responseServer = await response.json();
    const data = responseServer.results[0] as IConfigSite
    delete data.id
    return data;
}