import RadioButtonInput from "@components/RadioButtonInput";
import useCartStore from "@store/cart/useCartStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type ShippingType = "Domicilio" | "Punto de retiro" | "Sucursal";
type PaymentMethod = "Efectivo" | "Tarjeta de credito";

const paymentMethods: PaymentMethod[] = ["Tarjeta de credito"];
const shippingTypes: ShippingType[] = [
  "Domicilio",
  "Punto de retiro",
  "Sucursal",
];

const FormCheckout = () => {
  const { cartData } = useCartStore();
  const subTotal = cartData.reduce(
    (currentValue, item) => currentValue + item.price,
    0,
  );

  const router = useRouter();
  const [shippingType, setShippingType] = useState<ShippingType>("Domicilio");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Tarjeta de credito");

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

  return (
    <div className="card shadow p-6 border rounded-md">
      <form className="">
        <h2 className="font-bold">Datos de envio</h2>
        <RadioButtonInput
          className="my-4"
          name="type-shipping"
          totalItemsList={shippingTypes}
          itemsAvailables={shippingTypes}
          currentState={shippingType}
          onChange={handleOnShippingTypeChange}
        />

        {shippingType !== "Sucursal" && (
          <>
          {/* 
            <input
              className="form-input"
              type="text"
              placeholder="Codigo Postal"
            />
        */}

            <input 
              type="text" 
              id="zip-input" 
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Código postal" 
              pattern="^\d{5}(-\d{4})?$" 
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
        <header className="flex justify-between font-bold text-lg text-gray-900">
          <h3>Subtotal</h3>
          <p>${subTotal}</p>
        </header>
        <Link
          href="/checkout"
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Comprar
        </Link>
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
