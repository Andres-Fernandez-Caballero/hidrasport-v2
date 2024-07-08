import { useCallback, useEffect, useState } from "react"
import { BRANCH_DELIVERY, HOME_DELIVERY, PICKUP_POINT, ShippingType,  } from "@interfaces/IShipping";
import { CREDIT_CARD_PAYMENT, PaymentMethod } from "@interfaces/IpaymentMethods";
import { useAuthStore } from "@store/auth/auth.store";
import { fetchShippingAmount } from "@services/shipping";

export const ShippingTypes = [
  HOME_DELIVERY,
  PICKUP_POINT,
  BRANCH_DELIVERY,
 ];

const useCheckout = () => {

const {userSession } = useAuthStore();

 const [zipCode, setZipCode] = useState<string>(localStorage.getItem("zipCode") ?? "");
 const [shippingAmount, setShippingAmount] = useState<number>();
 const [ paymentMethod, setPaymentMethod] = useState<PaymentMethod>(CREDIT_CARD_PAYMENT);
 const [shippingType, setShippingType] = useState<ShippingType>(localStorage.getItem('shipingType')? localStorage.getItem('shippingType') as ShippingType:  HOME_DELIVERY);
 

 useEffect( () => {
  if(!zipCode) setShippingAmount (undefined);
    if(zipCode && isValidPostalCode(zipCode) && shippingType !== PICKUP_POINT){
    
        fetchShippingAmount(zipCode)
        .then(amount => setShippingAmount(amount))
     .catch((error => console.log(error))) ;
    }
 }, [zipCode, shippingType]) 

 function updateZipCode(zipCode: string){
   setZipCode(zipCode)
   localStorage.setItem('zipCode', zipCode);
    
 }
 
 function clearZipCode(){
    setZipCode('');
    localStorage.removeItem('zipCode');
 }

 const handleOnShippingTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShippingType(event.target.value as ShippingType);
    localStorage.setItem('shippingType', event.target.value as ShippingType);
  };

  const handleOnPaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };

  function isValidPostalCode(postalCode: string) {
    const fullRegex = /^[A-Z]\d{4}[A-Z]{3}$/;
    const simpleRegex = /^\d{4}$/;
    return fullRegex.test(postalCode) || simpleRegex.test(postalCode);
  }

  const haveZipCode = useCallback(() => {
    return (shippingType === HOME_DELIVERY || shippingType === BRANCH_DELIVERY);
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
    userSession,
  }
}

export default useCheckout;