import { ShippingMode, getShippingAmount } from "@repositories/shipping";

export const fetchShippingAmount = async(
  zipCode:string, 
  shippingType:ShippingMode | undefined): Promise<number>=> {
    if(!shippingType) return 0;
    try {
        const data = await getShippingAmount(zipCode, shippingType);
        console.log(data)
        return data.shipping_cost;
    }catch(error) {
      throw new Error("Error al calcular el costo de envio");  
    }
}
export const fetchShippingPO = async(
  zipCode:string ): Promise<number>=> {
    try {
        const data = await getShippingAmount(zipCode, 'ship_pas');
          return data.shipping_cost;
    }catch(error) {
      console.log('error envio', error);
      
      throw new Error("Error al calcular el costo de envio");  
    }
}