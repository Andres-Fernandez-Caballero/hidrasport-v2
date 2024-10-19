import { CREDIT_CARD_PAYMENT, PaymentMethod } from "@interfaces/Ipayment";
import { BRANCH_DELIVERY, HOME_DELIVERY, PICKUP_POINT, ShippingType } from "@interfaces/IShipping";
import { fetchShippingAmount } from "@services/shipping";
import { useCallback, useEffect, useState } from "react";
import { ShippingTypes } from ".";
import { IUseShipment } from "./contracts";
import useCartStore from "@store/cart/useCartStore";
import { SHIPPING_PAP, SHIPPING_PAS, ShippingMode } from "@repositories/shipping";
  

const shippingTypeMap: Record<ShippingType, ShippingMode> = {
  "Envio a Domicilio": SHIPPING_PAP,
  "Envio a Sucursal mas Cercana": SHIPPING_PAS,
  "Retiro en deposito Hidra": PICKUP_POINT
};

const useShipment = (): IUseShipment => {
  const [zipCode, setZipCode] = useState<string>(localStorage.getItem("zipCode") ?? "");
  const [shippingAmount, setShippingAmount] = useState<number>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(CREDIT_CARD_PAYMENT);

  // Verifica si el valor en localStorage es válido
  const getInitialShippingType = (): ShippingType => {
    const storedShippingType = localStorage.getItem('shippingType') as ShippingType;
    if (ShippingTypes.includes(storedShippingType)) {
      return storedShippingType;
    }
    return "Envio a Domicilio"; // Default readable shipping type
  };

  const [shippingType, setShippingType] = useState<ShippingType>(getInitialShippingType());

  useEffect(() => {
    if (!zipCode) setShippingAmount(undefined);
    if (zipCode && isValidPostalCode(zipCode) && shippingType !== PICKUP_POINT) {
      const mappedShippingType = shippingTypeMap[shippingType];
      fetchShippingAmount(zipCode, mappedShippingType)
        .then(amount => setShippingAmount(amount))
        .catch(error => console.log(error));
    }
    useCartStore.getState().getTotalAmount();
  }, [zipCode, shippingType]);

  function updateZipCode(zipCode: string) {
    setZipCode(zipCode);
    localStorage.setItem('zipCode', zipCode);
  }

  function clearZipCode() {
    setZipCode('');
    localStorage.removeItem('zipCode');
  }

  const handleOnShippingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newShippingType = event.target.value as ShippingType;
      setShippingType(newShippingType);
    localStorage.setItem('shippingType', newShippingType);
  };

  const handleOnPaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };

  function isValidPostalCode(postalCode: string) {
    const fullRegex = /^[A-Z]\d{4}[A-Z]{3}$/;
    const simpleRegex = /^\d{4}$/;
    return fullRegex.test(postalCode) || simpleRegex.test(postalCode);
  }

  const haveZipCode = useCallback(() => {
    return shippingType === HOME_DELIVERY || shippingType === BRANCH_DELIVERY;
  }, [shippingType]);

  return {
    shippingType,
    handleOnPaymentMethodChange,
    handleOnShippingTypeChange,
    clearZipCode,
    haveZipCode,
    zipCode,
    updateZipCode,
    shippingAmount,
    paymentMethod,
  };
}

export default useShipment;