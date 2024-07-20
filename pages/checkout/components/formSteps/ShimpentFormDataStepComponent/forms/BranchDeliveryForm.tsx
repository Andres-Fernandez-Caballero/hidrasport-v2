import { CheckoutFormDataProps } from "@pages/checkout/components/contracts";


const BranchDeliveryForm = (props: CheckoutFormDataProps) =>
(
    <>
        <h2 className="sr-only">{props.checkoutData.shipment.shippingType}</h2>
    </>
)

export default BranchDeliveryForm;