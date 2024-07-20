import { CheckoutFormDataProps } from "@pages/checkout/components/contracts";


const PickupPointForm = (props: CheckoutFormDataProps) => (
    <>
        <h2 className="sr-only">{props.checkoutData.shipment.shippingType}</h2>
    </>
)

export default PickupPointForm;