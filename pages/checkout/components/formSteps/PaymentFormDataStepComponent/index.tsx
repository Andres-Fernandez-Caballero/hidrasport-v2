import CreditCardForm from "@components/common/forms/inputCreditCard.component";
import RadioButtonInput from "@components/common/RadioButtonInput";
import { CREDIT_CARD_PAYMENT, BANK_TRANSFER, PaymentMethod } from "@interfaces/Ipayment";
import { useAuthStore } from "@store/auth/auth.store";
import { useEffect, useMemo, useState } from "react";
import { CheckoutFormDataProps } from "../../contracts";


const PaymentFormDataStepComponent = (props: CheckoutFormDataProps) => {
    const { checkoutData } = props
    const { userSession } = useAuthStore()

    const optionComponent: Record<PaymentMethod, React.ReactElement> = useMemo(() => ({
      [CREDIT_CARD_PAYMENT]: <CreditCardForm {...props} />,
      [BANK_TRANSFER]: <p>{BANK_TRANSFER}</p>,
      "Test": <div>Test Component</div>,
      "Test No Card": <div>No Card Test Component</div>,
  }), [props]);

    const [componentForm, setComponentForm] = useState<JSX.Element | null>(optionComponent[checkoutData.shipment.paymentMethod]);

    useEffect(() => {
        setComponentForm(optionComponent[checkoutData.shipment.paymentMethod]);
    }, [componentForm, checkoutData, optionComponent])

    return (
        <div>
            <RadioButtonInput
                className="my-4"
                name="type-shipping"
                totalItemsList={userSession.paymentMethods}
                itemsAvailables={userSession.paymentMethods}
                currentState={checkoutData.shipment.paymentMethod}
                onChange={checkoutData.shipment.handleOnPaymentMethodChange}
            />

            {componentForm}
        </div>
    )
}

export default PaymentFormDataStepComponent;