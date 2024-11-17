import { IConfigSite } from "@interfaces/hidraApi/siteConfig";

export interface SiteConfig extends IConfigSite {}

export type SiteConfigStore = {
    siteConfig: SiteConfig;
    fetchSiteConfig: () => Promise<SiteConfig> 
}
