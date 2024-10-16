import { create } from "zustand";
import { LandingStore } from "./landing.contracts";
import { fetchLanding } from "./landing.fetchers";
import { persist } from "zustand/middleware";
import { initState } from "./landing.init-state";
import { Product } from "@interfaces/IProduct";

const useLandingStore = create<LandingStore>()(
  persist(
    (set) => ({
      landing: initState,
      fetchLanding: async () => {
        const fetchedSiteConfig = await fetchLanding();

        const result = await fetch("/api/products/bestof");
        let notableProducts: Product[] = [];
        if (result.ok) {
          const data = await result.json(); //as Promise<ResponseProducts>
          notableProducts = data.results;
        }
        console.log(notableProducts);
        
        // Clonar el estado actual y reemplazar productosDestacados de forma inmutable
        set((state) => ({
          landing: {
            ...state.landing, // Mantener el resto del estado
            productosDestacados: [...notableProducts], // Reemplazar productosDestacados
          },
        }));

        return fetchedSiteConfig;
      },
    }),
    { name: "site-config", getStorage: () => localStorage }
  )
);

export default useLandingStore;
