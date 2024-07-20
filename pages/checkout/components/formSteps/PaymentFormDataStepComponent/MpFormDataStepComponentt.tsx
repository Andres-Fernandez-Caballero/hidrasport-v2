'use client'
import { MP_PUBLIC_KEY } from '@config/index';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'
import { useAuthStore } from '@store/auth/auth.store';
import { toast } from 'react-toastify';


export default function MpFormDataStepComponent()  {
    const {userSession} = useAuthStore()
        initMercadoPago(MP_PUBLIC_KEY);
        console.log('cliente mp ', MP_PUBLIC_KEY);
        

    return (
        <>
            <p>Compra protegida con Mercado Pago 💸</p>
            <CardPayment
                initialization={{ 
                    amount: 1000,
                    payer:{
                        email: userSession.email,

                    }
                 }}
                 onSubmit={async (param) => {
                    fetch('/api/payments/creditcard', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + userSession.token
                        },
                        body: JSON.stringify(param)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.status === 'approved'){
                            toast("Pago aprobado", {
                                type: 'success'
                            })
                        }else {
                            toast("Pago rechazado", {
                                type: 'error'
                            })
                        }
                        
                    })
                    .catch(error => console.error(error))
                 }}
            />
           
        </>
    )
}
