import RadioButtonInput from "@components/common/RadioButtonInput";
import { shippingTypes } from "@interfaces/IShipping";
import { useAuthStore } from "@store/auth/auth.store";
import useCartStore from "@store/cart/useCartStore";
import useCheckout from "app/hooks/useCheckout";
import { useRouter } from "next/router";
import styles from "./styles.module.css"
import React, { useEffect, useState } from "react";


const FormCheckout = () => {
  const { totalAmount } = useCartStore();
  const { userSession } = useAuthStore();
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


  useEffect(() => {
    if (!haveZipCode()) {
      setButtonCheckoutIsDisabled(false);
    } else if (haveZipCode() && shippingAmount) {
      setButtonCheckoutIsDisabled(false);
    } else {
      setButtonCheckoutIsDisabled(true);
    }
  }, [zipCode, totalAmount, shippingType, shippingAmount, haveZipCode]);

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
    <div >
      <form onSubmit={handleOnSubmit} className={styles.envioForm}>
        <h3 className="font-bold">Datos de envio</h3>
        
        <RadioButtonInput
          className={styles.envioButtons}
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

        <h2 className="font-bold">Método de pago</h2>
        <RadioButtonInput
          name="type-payment"
          className={styles.envioButtons}
          totalItemsList={userSession.paymentMethods}
          itemsAvailables={userSession.paymentMethods }
          currentState={paymentMethod}
          onChange={handleOnPaymentMethodChange}
        />
        {haveZipCode() &&  
        <div className="flex justify-between font-semibold text-gray-700">
          <h2>Envio</h2>
          <p>$ {shippingAmount ?? <span className="text-gray-300 font-light">Agrega el codigo postal</span>}</p>
        </div>}
        <div className="flex justify-between font-semibold text-gray-700">
          <h2>Productos en el carrito</h2>
          <p>$ {totalAmount}</p>
        </div>
        <hr />
        <header className="flex justify-between font-bold text-lg text-gray-900">
          <h3>Total</h3>
          <p>$ {checkout.totalAmountWithShipping}</p>
        </header>
        <button
          type="submit"
          disabled={buttonCheckoutIsDisabled}
           className={styles.comprarButton}
        >
          Comprar
        </button>
      </form>
    </div>
      
  );
}

export default FormCheckout;
