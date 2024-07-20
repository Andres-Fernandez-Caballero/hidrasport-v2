'use client'

import React, {  useRef } from "react";
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import useCartStore from "@store/cart/useCartStore";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import UserDataFormStepComponent from "./components/formSteps/UserFormDataStepComponent";
import { useAuthStore } from "@store/auth/auth.store";
import ShipmentFormDataStepComponent from "./components/formSteps/ShimpentFormDataStepComponent";
import useCheckout from "app/hooks/useCheckout";
import MpFormDataStepComponent from "./components/formSteps/PaymentFormDataStepComponent/MpFormDataStepComponentt";

export default function CheckoutPage() {
  const router = useRouter()
  const {isLogedIn, userSession} = useAuthStore();
  const checkoutData = useCheckout();
  const cart = useCartStore()
  const stepperRef = useRef<StepperRefAttributes>(null);

//  const [total, setTotoal] =useState<number>(cart.totalAmount + (checkoutData.shipment.shippingAmount ?? 0)); 

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
          <ShipmentFormDataStepComponent 
            checkoutData = {checkoutData}
          />  
          <menu className="flex justify-center items-center gap-4">
            <PrevButton />
            <NextButton />
          </menu>
        </StepperPanel>
        <StepperPanel header="Datos de pago">
          <MpFormDataStepComponent />      
          {/* <PaymentFormDataStepComponent checkoutData={checkoutData}/> */}
          
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
              <p>{checkoutData.shipmentForm.shipmentFormData.street}</p>
              <p>{checkoutData.shipmentForm.shipmentFormData.number}</p>
              <p>{checkoutData.shipmentForm.shipmentFormData.depto}</p>
              <p>{checkoutData.shipmentForm.shipmentFormData.neighborhood}</p>
              <p>{checkoutData.shipmentForm.shipmentFormData.zipcode}</p>
              <p>{checkoutData.shipmentForm.shipmentFormData.city}</p>
              <p>{checkoutData.shipmentForm.shipmentFormData.state}</p>
            </article>

            <article>
              <h4 className="text-lg font-bold border-b-2">
                Detalle
              </h4>
              <p>Gastos de envio: {100}</p>
              <p>Productos en el carrito {cart.totalAmount}</p>
              <h5>total {cart.totalAmount + 100} </h5>
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
}