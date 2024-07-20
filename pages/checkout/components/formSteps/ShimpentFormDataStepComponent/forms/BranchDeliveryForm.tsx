import CheckoutFormDataProps from "../../../contracts";

const BranchDeliveryForm = (props: CheckoutFormDataProps) =>
(
    <>
        <h2 className="sr-only">{props.checkoutData.shippingType}</h2>
    </>
)

export default BranchDeliveryForm;