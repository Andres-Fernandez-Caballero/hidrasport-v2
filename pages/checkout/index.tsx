import React, { useRef, useState } from "react";
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import CreditCardForm, { useCreditCard } from "@components/common/forms/inputCreditCard.component";
import useCartStore from "@store/cart/useCartStore";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import UserDataFormStepComponent from "./components/formSteps/UserFormDataStepComponent";
import { useAuthStore } from "@store/auth/auth.store";
import ShipmentFormDataStepComponent from "./components/formSteps/ShimpentFormDataStepComponent";


interface ShipmentFormData {
  name: string;
  lastname: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  number: string;
  depto: string;
  neighborhood: string;
}

const useShipmentFormData = () => {

  const initState: ShipmentFormData = {
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

  const [shipmentFormData, setShipmentFormData] = useState<ShipmentFormData>(initState)

  const handleOnChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShipmentFormData({
      ...shipmentFormData,
      [event.target.name]: event.target.value,
    });
  }

  return {
    shipmentFormData,
    handleOnChage,
  }
}

const Checkout = () => {
  const router = useRouter()
  const {isLogedIn, userSession} = useAuthStore()
  
  const shipmentFormData = useShipmentFormData();
  const paymentFormData = useCreditCard()

  const stepperRef = useRef<StepperRefAttributes>(null);

  const PrevButton = () => (
    <Button label="prev" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
  )

  interface NextButtonProps {
    rule?: boolean;
  }
  const NextButton = (props: NextButtonProps) => (
    <Button label="next" icon="pi pi-arrow-right" onClick={() => {
      if(props.rule === undefined || props.rule)
        stepperRef.current?.nextCallback()
      else {
        alert('debe cumplir la regla')
      }
    }} />
  )

  const useCart = useCartStore()

  return (
    <section className="card border shadow p-4">
      <Stepper ref={stepperRef}>
        <StepperPanel header="Datos de Usuario">
          <div className="flex items-center">
            <UserDataFormStepComponent />
            <menu className="flex justify-center items-center gap-4">
              <NextButton rule={isLogedIn()} />
            </menu>
          </div>

        </StepperPanel>


        <StepperPanel header="Datos de envio">
          <ShipmentFormDataStepComponent />
          <menu className="flex justify-center items-center gap-4">
            <PrevButton />
            <NextButton />
          </menu>
        </StepperPanel>
        <StepperPanel header="Datos de pago">

          <CreditCardForm
            {...paymentFormData}
          />
          <menu className="flex justify-center items-center gap-4">
            <PrevButton />
            <NextButton />
          </menu>
        </StepperPanel>
        <StepperPanel header="Confirmacion de Pago">
          <section className="flex justify-center card flex-col items-center">
            <h3 className="font-bold text-xl">Datos de Facturacion</h3>
            <article className="my-4">
              <h4 className="text-lg font-bold border-b-2">Datos de usuario</h4>
              <p>{ userSession.username}</p>
              <p>{userSession.email}</p>
            </article>
            <article className="my-4">
              <h4 className="text-lg font-bold border-b-2">Datos de envio</h4>
              <p>{shipmentFormData.shipmentFormData.street}</p>
              <p>{shipmentFormData.shipmentFormData.number}</p>
              <p>{shipmentFormData.shipmentFormData.depto}</p>
              <p>{shipmentFormData.shipmentFormData.neighborhood}</p>
              <p>{shipmentFormData.shipmentFormData.zipcode}</p>
              <p>{shipmentFormData.shipmentFormData.city}</p>
              <p>{shipmentFormData.shipmentFormData.state}</p>
            </article>

            <article>
              <h4 className="text-lg font-bold border-b-2">
                Detalle
              </h4>
              <p>Gastos de envio: {100}</p>
              <p>Productos en el carrito {useCart.totalAmount}</p>
              <h5>total {useCart.totalAmount + 100} </h5>
            </article>


          </section>
          <menu className="flex justify-center items-center gap-4">
            <PrevButton />
            <button
              onClick={() => {
                toast.success('Felicidades tu producto esta en camino 🚚')
                router.push('/')
              }}
              className="bg-blue-600 text-white p-2 border-2 rounded-md">Confirmar Compra</button>
          </menu>
        </StepperPanel>
      </Stepper>

    </section>
  );
};

export default Checkout;
