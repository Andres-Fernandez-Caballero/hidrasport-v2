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
import styles from "./styles.module.css"

export default function CheckoutPage() {
  const {isLogedIn} = useAuthStore();
  const checkoutData = useCheckout();
  const stepperRef = useRef<StepperRefAttributes>(null);

//  const [total, setTotoal] =useState<number>(cart.totalAmount + (checkoutData.shipment.shippingAmount ?? 0)); 

  const PrevButton = () => (
    <Button label="Atras" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
  )
  
    interface NextButtonProps {
      rule?: boolean;
    }
  const NextButton = (props: NextButtonProps) => (
    <Button label="Continuar" icon="pi pi-arrow-right" onClick={() => {
      if(props.rule === undefined || props.rule)
        stepperRef.current?.nextCallback()
      else {
        alert('Complete los pasos antes de continuar.')
      }
    }} />
  )

  return (
    <section className={ styles.stepsContainer }>

      <Stepper ref={stepperRef}>
        <StepperPanel header=">">
          <div>
            <UserDataFormStepComponent />
            <menu className="flex justify-center items-center gap-4">
              <div className="flex w-11/12 justify-end">
                <NextButton rule={isLogedIn()} />
              </div>
            </menu>
          </div>

        </StepperPanel>


        <StepperPanel header=">">
          <ShipmentFormDataStepComponent 
            checkoutData = {checkoutData}
          />  
          <menu className="flex justify-between items-center gap-4">
            <PrevButton />
            <NextButton />
          </menu>
        </StepperPanel>
        <StepperPanel header="" >
          <div className={styles.mpContainer}>
            <MpFormDataStepComponent />      
            {/* <PaymentFormDataStepComponent checkoutData={checkoutData}/> */}
          </div>
          
          <menu className="flex justify-center items-center gap-4">
            <PrevButton />
          </menu>
        </StepperPanel>
       
      </Stepper>

    </section>
  );
}