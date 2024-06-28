import { useState } from "react";

export const PICKUP_POINT = "Retiro en deposito Hidra";
export const HOME_DELIVERY = "Envio a Domicilio";
export const BRANCH_DELIVERY = "Envio a Sucursal mas Cercana";

const useShipping = () =>{
    // names of shipping methods

type ShippingType = typeof HOME_DELIVERY | typeof PICKUP_POINT | typeof BRANCH_DELIVERY;


    const [zipCode, setzipCode] = useState<string>();
    const [shippingAmount, setShippingAmount] = useState<number>();
    const [shippingType, setShippingType] = useState<ShippingType>(HOME_DELIVERY);

    // TODO: add validations for zip code
    function updateZipCode(zipCode: string){
        setzipCode(zipCode);
    }

    // TODO: add validations for shipping amount
    function updateShippingAmount(amount: number){
        setShippingAmount(amount);
    }

    return {
        zipCode,
        updateZipCode,
        shippingAmount,
        updateShippingAmount,
        shippingType,
        setShippingType,
    }    
}

export default useShipping;