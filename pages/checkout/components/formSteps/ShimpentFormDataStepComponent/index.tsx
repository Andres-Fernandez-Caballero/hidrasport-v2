import RadioButtonInput from "@components/common/RadioButtonInput";
import { HOME_DELIVERY, PICKUP_POINT, BRANCH_DELIVERY, ShippingType } from "@interfaces/IShipping";
import { ShippingTypes } from "app/hooks/useCheckout";
import { useEffect, useMemo, useState } from "react";
import {CheckoutFormDataProps} from "../../contracts";
import HomeDeliveryForm from "./forms/HomeDeliveryForm";
import PickupPointForm from "./forms/PickupPointForm";
import BranchDeliveryForm from "./forms/BranchDeliveryForm";
import styles from "../../../styles.module.css"


const ShipmentFormDataStepComponent = (props: CheckoutFormDataProps) => {
    

    const optionComponent: Record<ShippingType, React.ReactElement<CheckoutFormDataProps>> = useMemo(() => ({
        [HOME_DELIVERY]: <HomeDeliveryForm {...props} />,
        [PICKUP_POINT]: <PickupPointForm {...props} />,
        [BRANCH_DELIVERY]: <BranchDeliveryForm {...props} />,
    }), [props]);


    const [componentForm, setComponentForm] = useState<JSX.Element | null>(optionComponent[props.checkoutData.shipment.shippingType]); // Inicializa con null o un JSX.Element según prefieras

    useEffect(() => {
        setComponentForm(optionComponent[props.checkoutData.shipment.shippingType])
    }, [props.checkoutData.shipment.shippingType, optionComponent]);

    return (
        <div className={styles.stepContainer}>
            <RadioButtonInput
                className="mb-4"
                name="type-shipping"
                totalItemsList={ShippingTypes}
                itemsAvailables={ShippingTypes}
                currentState={props.checkoutData.shipment.shippingType}
                onChange={props.checkoutData.shipment.handleOnShippingTypeChange}
            />

            {componentForm}
        </div>
    );
};

export default ShipmentFormDataStepComponent;