import { useState } from "react";
import { IShipmentFormData, IUseShipmentForm } from "./contracts";

export const useShipmentForm = (): IUseShipmentForm => {

    const initState: IShipmentFormData = {
      name: "",
      lastname: "",
      number: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      depto: "",
      neighborhood: ""
    }
    const [shipmentFormData, setShipmentFormData] = useState<IShipmentFormData>(initState)
  
    function clearShipmentFormData ():void {
        setShipmentFormData(initState);
    }

    function handleOnChage (event: React.ChangeEvent<HTMLInputElement>) {
      setShipmentFormData({
        ...shipmentFormData,
        [event.target.name]: event.target.value,
      });
    }
  
    return {
      shipmentFormData,
      clearShipmentFormData,
      handleOnChage,
    }
  }