import { ILandigPage } from "@interfaces/hidraApi/landingPage";
import { ISiteConfig } from "@interfaces/hidraApi/siteConfig";

export interface SiteConfig extends ISiteConfig, ILandigPage {}

export type SiteConfigStore = {
    siteConfig: SiteConfig;
    fetchSiteConfig: () => Promise<SiteConfig> 
}
