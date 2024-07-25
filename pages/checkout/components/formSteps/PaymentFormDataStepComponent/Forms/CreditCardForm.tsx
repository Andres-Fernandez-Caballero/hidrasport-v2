import CreditCardForm from "@components/common/forms/inputCreditCard.component";
import { CheckoutFormDataProps } from "@pages/checkout/components/contracts";

/**
 * @deprecated Use MpFormDataSetpComponent instead
 * @param props 
 */
export default function CreditCardFormComponent(props: CheckoutFormDataProps)  {
    <CreditCardForm
            {...props}
    />
}