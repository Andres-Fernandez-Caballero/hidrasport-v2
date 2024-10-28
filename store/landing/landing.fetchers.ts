import urls from "@config/urls";
import { Landing  } from "./landing.contracts";

export const fetchLanding = async(): Promise<Landing> => {
    const response = await fetch(urls.landingPage);
    return response.json();
}