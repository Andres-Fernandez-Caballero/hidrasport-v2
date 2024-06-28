import RadioButtonInput from "@components/common/RadioButtonInput";
import { fetchShippingAmount } from "@services/shipping";
import useCartStore from "@store/cart/useCartStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


// names of shipping methods
const PICKUP_POINT = "Retiro en deposito Hidra";
const HOME_DELIVERY = "Envio a Domicilio";
const BRANCH_DELIVERY = "Envio a Sucursal mas Cercana";

type ShippingType = typeof HOME_DELIVERY | typeof PICKUP_POINT | typeof BRANCH_DELIVERY;

// names of payment methods
const CASH_PAYMENT = "Efectivo";
const CREDIT_CARD_PAYMENT = "Tarjeta de Credito";

type PaymentMethod = typeof CASH_PAYMENT | typeof CREDIT_CARD_PAYMENT;

// Options for the payment method menu
const paymentMethods: PaymentMethod[] = [
  CREDIT_CARD_PAYMENT
];

// Options for the shipping method menu
const shippingTypes: ShippingType[] = [
  HOME_DELIVERY,
  PICKUP_POINT,
  BRANCH_DELIVERY,
];

const FormCheckout = () => {
  const { totalAmount } = useCartStore();

  const [zipCode, setzipCode] = useState<string>();
  const [shippingAmount, setShippingAmount] = useState<number>();
  const [buttonCheckoutIsDisabled, setButtonCheckoutIsDisabled] = useState<boolean>(true);
  const subTotal = totalAmount

  const router = useRouter();
  const [shippingType, setShippingType] = useState<ShippingType>(HOME_DELIVERY);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>(CREDIT_CARD_PAYMENT);

  const handleOnShippingTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShippingType(event.target.value as ShippingType);
  };

  const handleOnPaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };


  useEffect(() => {
    function isValidPostalCode(postalCode: string) {
      const fullRegex = /^[A-Z]\d{4}[A-Z]{3}$/;
      const simpleRegex = /^\d{4}$/;
      return fullRegex.test(postalCode) || simpleRegex.test(postalCode);
    }

    if(!zipCode) setShippingAmount (undefined);
    if(zipCode && isValidPostalCode(zipCode) && shippingType !== PICKUP_POINT){
    
        fetchShippingAmount(zipCode)
        .then(amount => setShippingAmount(amount))
     .catch((error => console.log(error))) ;
    }
  }, [zipCode, shippingType])
  

  useEffect(() => {
    if(shippingType === PICKUP_POINT) setButtonCheckoutIsDisabled(false);
    else if((shippingType === BRANCH_DELIVERY || shippingType === HOME_DELIVERY) && shippingAmount) 
      setButtonCheckoutIsDisabled(false);
    else setButtonCheckoutIsDisabled(true);
  }, [shippingAmount, shippingType])

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch(shippingType){
      case PICKUP_POINT:
        break;
      case HOME_DELIVERY: 
        break;

      case BRANCH_DELIVERY: 
        break;
      default:
        break;
    }
    router.push({
      pathname: '/checkout',
      query: {
        zipCode
      }
    });
  }

  return (
    <div className="card shadow p-6 border rounded-md">
      <form onSubmit={handleOnSubmit}>
        <h2 className="font-bold">Datos de envio</h2>
        <RadioButtonInput
          className="my-4"
          name="type-shipping"
          totalItemsList={shippingTypes}
          itemsAvailables={shippingTypes}
          currentState={shippingType}
          onChange={handleOnShippingTypeChange}
        />

        {(shippingType === HOME_DELIVERY || shippingType === BRANCH_DELIVERY) && (
          <>
            <input 
              type="text"  
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Código postal"
              value={zipCode}
              onChange={(event) => setzipCode(event.target.value)}
              required 
            />
          </>
        )}

        <h2 className="mt-6 font-bold">Método de pago</h2>
        <RadioButtonInput
          className="my-4"
          name="type-payment"
          totalItemsList={paymentMethods}
          itemsAvailables={paymentMethods}
          currentState={paymentMethod}
          onChange={handleOnPaymentMethodChange}
        />
        {(shippingType === HOME_DELIVERY || shippingType === BRANCH_DELIVERY) &&  
        <div className=" mt-10 flex justify-between font-semibold text-gray-700">
          <h2>Envio</h2>
          <p>{shippingAmount ?? <span className="text-red-500">Sin Codigo Postal</span>}</p>
        </div>}
        <div className="flex justify-between font-semibold text-gray-700">
          <h2>Productos en el carrito</h2>
          <p>{totalAmount}</p>
        </div>
        <hr />
        <header className="my-4 flex justify-between font-bold text-lg text-gray-900">
          <h3>Total</h3>
          <p>${subTotal + (shippingAmount ?? 0)}</p>
        </header>
        <button
          type="submit"
          disabled={buttonCheckoutIsDisabled}
           className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-300"
        >
          Comprar
        </button>
      </form>
      <nav className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          o&nbsp;
          <button
            onClick={() => {
              router.push("/");
            }}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continua Comprando 🏊
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </nav>
    </div>
  );
};

export default FormCheckout;
