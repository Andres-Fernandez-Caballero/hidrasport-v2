import { BRANCH_DELIVERY, HOME_DELIVERY, PICKUP_POINT } from "@interfaces/IShipping";
import IUseCheckout from "./contracts";
import { useShipmentForm } from "./useShipmentForm";
import { useCreditCardForm } from "./useCreditCardForm";
import useShipment from "./useShipment";
import { useEffect, useState } from "react";
import useCartStore from "@store/cart/useCartStore";

export const ShippingTypes = [
  HOME_DELIVERY,
  PICKUP_POINT,
  BRANCH_DELIVERY,
];

const useCheckout = ():IUseCheckout => {
  const [totalAmountWithShipping, setTotalAmountWithShipping] = useState<number>(0);
  const { totalAmount } = useCartStore();
  const shipmentForm = useShipmentForm()
  const creditCardForm = useCreditCardForm()
  const shipment = useShipment()

  useEffect(() => {
    setTotalAmountWithShipping(shipment.shippingType !== PICKUP_POINT && shipment.shippingAmount? shipment.shippingAmount + totalAmount  : totalAmount );
  },
  [shipment.shippingType, shipment.shippingAmount, totalAmount]);

  return {
    shipment,
    shipmentForm,
    creditCardForm,
    totalAmountWithShipping,
  };
}

export default useCheckout;
