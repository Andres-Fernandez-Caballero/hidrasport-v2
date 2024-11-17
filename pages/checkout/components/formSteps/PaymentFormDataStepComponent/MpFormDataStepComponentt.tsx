'use client'
import { MP_PUBLIC_KEY } from '@config/index';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'
import { useAuthStore } from '@store/auth/auth.store';
import useCheckout from 'app/hooks/useCheckout';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export default function MpFormDataStepComponent() {
    const { userSession } = useAuthStore();
    const {totalAmountWithShipping} = useCheckout()
    const router = useRouter();
    initMercadoPago(MP_PUBLIC_KEY);

    return (
        <div>
            <CardPayment
                initialization={{
                    amount: totalAmountWithShipping,
                    payer: {
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
                            if (data.status === 'approved') {
                                router.push('/checkout/resumen');
                                toast("Pago aprobado", {
                                    type: 'success'
                                })
                            } else {
                                toast("Pago rechazado", {
                                    type: 'error'
                                })
                            }

                        })
                        .catch(error => console.error(error))
                }}
            />

        </div>
    )
}
