import RadioButtonInput from "@components/common/RadioButtonInput";
import { shippingTypes } from "@interfaces/IShipping";
import { useAuthStore } from "@store/auth/auth.store";
import useCartStore from "@store/cart/useCartStore";
import useCheckout from "app/hooks/useCheckout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


const FormCheckout = () => {
  const { totalAmount } = useCartStore();
  const {userSession} = useAuthStore();
  const [buttonCheckoutIsDisabled, setButtonCheckoutIsDisabled] = useState<boolean>(true);
  
  const router = useRouter();
  const checkout = useCheckout();
  
  const {
    shippingType,
    zipCode, 
    handleOnShippingTypeChange,
    haveZipCode,
    updateZipCode,
    shippingAmount,
    handleOnPaymentMethodChange,
    paymentMethod,

  } = checkout.shipment


  useEffect(
    () => {
      if(!haveZipCode()) 
        setButtonCheckoutIsDisabled(false);
      else if(haveZipCode() && shippingAmount) {
        setButtonCheckoutIsDisabled(false);
      } else 
      setButtonCheckoutIsDisabled(true);
    }, [zipCode, totalAmount, shippingType, shippingAmount, haveZipCode]
  )

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // validate date of somehow
    router.push({
      pathname: '/checkout',
      query: {
       // zipCode
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

        { haveZipCode() && (
          <>
            <input 
              type="text"  
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Código postal"
              value={zipCode}
              onChange={(event) => updateZipCode(event.target.value)}
              required 
            />
          </>
        )}

        <h2 className="mt-6 font-bold">Método de pago</h2>
        <RadioButtonInput
          className="my-4"
          name="type-payment"
          totalItemsList={userSession.paymentMethods}
          itemsAvailables={userSession.paymentMethods }
          currentState={paymentMethod}
          onChange={handleOnPaymentMethodChange}
        />
        {haveZipCode() &&  
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
          <p>${totalAmount + (shippingAmount ?? 0)}</p>
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
}

export default FormCheckout;
