'use client'

import React, {  useRef } from "react";
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import UserDataFormStepComponent from "./components/formSteps/UserFormDataStepComponent";
import { useAuthStore } from "@store/auth/auth.store";
import ShipmentFormDataStepComponent from "./components/formSteps/ShimpentFormDataStepComponent";
import useCheckout from "app/hooks/useCheckout";
import MpFormDataStepComponent from "./components/formSteps/PaymentFormDataStepComponent/MpFormDataStepComponentt";

export default function CheckoutPage() {
  const {isLogedIn} = useAuthStore();
  const checkoutData = useCheckout();
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
          </menu>
        </StepperPanel>
       
      </Stepper>

    </section>
  );
}