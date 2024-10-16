import { ShippingMode, getShippingAmount } from "@repositories/shipping";

export const fetchShippingAmount = async(
  zipCode:string, 
  shippingType:ShippingMode="ship_pap"): Promise<number>=> {
    try {
        const data = await getShippingAmount(zipCode, shippingType);
        // TODO: ask for tax_price attribute
        console.log('data envio', data)
        return data.results[0].price;
    }catch(error) {
      console.log('error envio', error);
      
      throw new Error("Error al calcular el costo de envio");  
    }
}