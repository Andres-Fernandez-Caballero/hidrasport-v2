import { SiteConfig } from "./siteConfig.contracts";

export const fetchSiteConfig = async(): Promise<SiteConfig> => {
    const response = await fetch('/api/siteconfig');
    console.log("response.json")
    return response.json();
}