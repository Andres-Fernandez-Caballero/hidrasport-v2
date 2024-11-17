import { create } from "zustand";
import { LandingStore } from "./landing.contracts";
import { fetchLanding } from "./landing.fetchers";
import { persist } from "zustand/middleware";
import { initState } from "./landing.init-state";

const useLandingStore = create<LandingStore>()(
  persist(
    (set) => ({
      landing: initState,
      fetchLanding: async () => {
        const fechedLandingData = await fetchLanding();
        
        set({landing: {...fechedLandingData}});

        return fechedLandingData;
      },
    }),
    { name: "site-landing", getStorage: () => localStorage }
  )
);

export default useLandingStore;
