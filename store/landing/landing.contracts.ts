import { ILandigPage } from "@interfaces/hidraApi/landingPage";

export interface Landing extends ILandigPage {}

export type LandingStore = {
    landing: Landing;

    fetchLanding: () => Promise<Landing>;  // Fetch the landing page from the server
}