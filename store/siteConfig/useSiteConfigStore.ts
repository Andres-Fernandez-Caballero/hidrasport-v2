import { create } from "zustand";
import { SiteConfigStore } from "./siteConfig.contracts";
import { fetchSiteConfig } from "./siteConfig.fetchers";
import { persist } from "zustand/middleware";
import { initState } from "./siteConfig.init-state";



const useSiteConfigStore = create<SiteConfigStore>() (persist (
    (set) => ({
        siteConfig: initState,
        fetchSiteConfig: async () => {
            const fetchedSiteConfig = await fetchSiteConfig();
            set({ siteConfig: fetchedSiteConfig });
            return fetchedSiteConfig;
        }
    }),
    { name: "site-config", getStorage: () => localStorage }
))



export default useSiteConfigStore;