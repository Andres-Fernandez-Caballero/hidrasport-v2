import { ISiteConfig } from "@interfaces/hidraApi/siteConfig";

export interface SiteConfig extends ISiteConfig {}

export type SiteConfigStore = {
    siteConfig: SiteConfig;
    fetchSiteConfig: () => Promise<SiteConfig> 
}
