import { SiteConfig } from "./siteConfig.contracts";

export const fetchSiteConfig = async(): Promise<SiteConfig> => {
    const response = await fetch('/api/landing');
    return response.json();
}