import { BRANCH_DELIVERY, HOME_DELIVERY, PICKUP_POINT } from "@interfaces/IShipping";
import IUseCheckout from "./contracts";
import { useShipmentForm } from "./useShipmentForm";
import { useCreditCardForm } from "./useCreditCardForm";
import useShipment from "./useShipment";

export const ShippingTypes = [
  HOME_DELIVERY,
  PICKUP_POINT,
  BRANCH_DELIVERY,
];

const useCheckout = ():IUseCheckout => {
  const shipmentForm = useShipmentForm()
  const creditCardForm = useCreditCardForm()
  const shipment = useShipment()
  
  return {
    shipment,
    shipmentForm,
    creditCardForm,
  };
}

export default useCheckout;
