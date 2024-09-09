import { Landing  } from "./landing.contracts";

export const fetchLanding = async(): Promise<Landing> => {
    const response = await fetch('/api/landing');
    return response.json();
}