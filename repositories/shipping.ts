import { SHIPPING_TOKEN } from "@config/index";
import urls from "@config/urls";

export const API_BASE_URL = 'https://api.shipnow.com.ar';

export const SHIPPING_PAP = 'ship_pap';

/**
 * Post Office to Post Office shipments. 
 */
export const SHIPPING_SAS = 'ship_sas';

/**
 *  Door to PostOffice shipments.
 */
export const SHIPPING_PAS = 'ship_pas';


export type ShippingMode = typeof SHIPPING_PAP | typeof SHIPPING_PAS | typeof SHIPPING_SAS; 

export const getShippingAmount = async (zipCode: string, shippingType: ShippingMode) => {
  let authToken = '';
  const authTokenString = localStorage.getItem('auth-storage');
  if (authTokenString) {
    const authTokenObject = JSON.parse(authTokenString);
    const token = authTokenObject.state.userSession.token;
    authToken = token;
  }

  const response = await fetch(`${urls.calculateShipping}?postalCode=${zipCode}&shippingType=${shippingType}`, {
      headers: {
        'content-type': 'application/json',
        ...(authToken ? { Authorization: `Token ${authToken}` } : {}),
      }
    });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};