import React, { useEffect, useRef, useState } from "react";
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import InputFormComponent from "@components/common/forms/input.component";
import CreditCardForm, { useCreditCard } from "@components/common/forms/inputCreditCard.component";
import useCartStore from "@store/cart/useCartStore";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const useUserFormData = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleOnChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserFormData({
     ...userFormData,
      [event.target.name]: event.target.value,
    });
  }

  return {
    userFormData,
    handleOnChage,
  }
}

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
  const userFormData = useUserFormData();
  const shipmentFormData = useShipmentFormData();
  const paymentFormData = useCreditCard()

  const stepperRef = useRef<StepperRefAttributes>(null);

  const PrevButton = () => (
    <Button label="prev" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
  )

  const NextButton = () => (
    <Button label="next" icon="pi pi-arrow-right" onClick={() => stepperRef.current?.nextCallback()} />
  )

  const useCart = useCartStore()

  useEffect(
    () => {

    }, []
  )



  return (
    <section className="card border shadow p-4">
      <Stepper ref={stepperRef}>
        <StepperPanel header="Datos de Usuario">
          <InputFormComponent
            label="Nombre"
            name="name"
            onChange={userFormData.handleOnChage}
            type="text"
            value={userFormData.userFormData.name}

          />
          <InputFormComponent
            label="Email"
            name="email"
            onChange={userFormData.handleOnChage}
            type="text"
            value={userFormData.userFormData.email}

          />
          <InputFormComponent
            label="Password"
            name="password"
            onChange={userFormData.handleOnChage}
            type="text"
            value={userFormData.userFormData.password}

          />
          <InputFormComponent
            label="Confirmar Password"
            name="password2"
            onChange={userFormData.handleOnChage}
            type="text"
            value={userFormData.userFormData.password2}

          />
           <menu className="flex justify-center items-center gap-4">
            <NextButton />
           </menu>

        </StepperPanel>


        <StepperPanel header="Datos de envio">
          <fieldset>
            <legend className="sr-only">Datos de envio</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <InputFormComponent
                label="Calle"
                name="street"
                onChange={shipmentFormData.handleOnChage}
                type="text"
                value={shipmentFormData.shipmentFormData.street}
              />
              <InputFormComponent
                label="Altura"
                name="number"
                onChange={shipmentFormData.handleOnChage}
                type="number"
                value={shipmentFormData.shipmentFormData.number}
              />
              <InputFormComponent
                label="Depto / Piso"
                name="depto"
                onChange={shipmentFormData.handleOnChage}
                type="text"
                value={shipmentFormData.shipmentFormData.depto}
              />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <InputFormComponent
                  label="Barrio"
                  name="neighborhood"
                  onChange={shipmentFormData.handleOnChage}
                  type="text"
                  value={shipmentFormData.shipmentFormData.neighborhood}
                />
                <InputFormComponent
                  label="Codigo Postal"
                  name="zipcode"
                  onChange={shipmentFormData.handleOnChage}
                  type="text"
                  value={shipmentFormData.shipmentFormData.zipcode}
                />
                <InputFormComponent
                  label="Ciudad"
                  name="city"
                  onChange={shipmentFormData.handleOnChage}
                  type="text"
                  value={shipmentFormData.shipmentFormData.city}
                />
                <InputFormComponent
                  label="Provincia"
                  name="state"
                  onChange={shipmentFormData.handleOnChage}
                  type="text"
                  value={shipmentFormData.shipmentFormData.state}
                />
              </div>

            </div>
          </fieldset>
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
            <p>{userFormData.userFormData.name}</p>
            <p>{userFormData.userFormData.email}</p>
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
