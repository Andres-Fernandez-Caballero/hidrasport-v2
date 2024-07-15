import ShipmentFormProps from "./interface";

const PickupPointForm = (props: ShipmentFormProps) => (
    <>
        <h2 className="sr-only">{props.checkoutData.shippingType}</h2>
    </>
)

export default PickupPointForm;