import RadioButtonInput from "@components/common/RadioButtonInput";
import { HOME_DELIVERY, PICKUP_POINT, BRANCH_DELIVERY, ShippingType } from "@interfaces/IShipping";
import useCheckout, { ShippingTypes } from "app/hooks/useCheckout";
import { useEffect, useMemo, useState } from "react";
import ShipmentFormProps from "./forms/interface";
import HomeDeliveryForm from "./forms/HomeDeliveryForm";
import PickupPointForm from "./forms/PickupPointForm";
import BranchDeliveryForm from "./forms/BranchDeliveryForm";





const ShipmentFormDataStepComponent = () => {
        const checkoutData = useCheckout(); // Asumiendo que useCheckout es un hook personalizado para obtener el estado de checkout

        const optionComponent: Record<ShippingType, React.ReactElement<ShipmentFormProps>> = useMemo(() => ({
            [HOME_DELIVERY]: <HomeDeliveryForm checkoutData={checkoutData} />,
            [PICKUP_POINT]: <PickupPointForm checkoutData={checkoutData}/>,
            [BRANCH_DELIVERY]: <BranchDeliveryForm checkoutData={checkoutData}/>,
        }), [checkoutData]);


    const [componentForm, setComponentForm] = useState<JSX.Element | null>(optionComponent[checkoutData.shippingType]); // Inicializa con null o un JSX.Element según prefieras

    useEffect(() => {
        setComponentForm(optionComponent[checkoutData.shippingType])
    }, [checkoutData.shippingType, optionComponent]);
    
    return (
        <div>
            <RadioButtonInput
                className="my-4"
                name="type-shipping"
                totalItemsList={ShippingTypes}
                itemsAvailables={ShippingTypes}
                currentState={checkoutData.shippingType}
                onChange={checkoutData.handleOnShippingTypeChange}
            />

            {componentForm}
        </div>
    );
};

export default ShipmentFormDataStepComponent;