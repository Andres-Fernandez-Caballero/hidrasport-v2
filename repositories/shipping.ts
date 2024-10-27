import { SHIPPING_TOKEN } from "@config/index";

export const API_BASE_URL = 'https://api.shipnow.com.ar';

/**
 * Door to Door shipments.
 */
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
  const response = await fetch(`${API_BASE_URL}/shipping_options?&to_zip_code=${zipCode}&types=${shippingType}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + SHIPPING_TOKEN
      }
    });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};