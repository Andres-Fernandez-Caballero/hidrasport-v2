/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckoutFormDataProps } from "@pages/checkout/components/contracts";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { fetchShippingPO } from "@services/shipping";
import useShipment from "app/hooks/useCheckout/useShipment";

export default function BranchDeliveryForm(props: CheckoutFormDataProps) {
    const { updatePOPrice } = useShipment()
    const [selectedPO, setSelectedPO] = useState(null);
    const [postOffices, setPostOffices] = useState([]);

    useEffect(() => {
        // Solo fetch si hay código postal
        if (props.checkoutData.shipment.zipCode) {
            fetchShippingPO(props.checkoutData.shipment.zipCode)
                .then((data: any) => {
                     // Mapea las oficinas postales para el dropdown
                    const formattedPOs = data.map((po: any) => ({
                        label: "$" + po.price + " | " + po.ship_to.address.line,
                        value: { id: po.ship_to.id, price: po.price },
                    }));
                    setPostOffices(formattedPOs);
                })
                .catch(error => console.error('Error fetching post offices:', error));
        }
    }, [props.checkoutData.shipment.zipCode]);

    return (
        <form>
            <h2 className="font-bold">Datos de envio</h2>

            {props.checkoutData.shipment.haveZipCode() && (
                <>
                    <span>Código Postal</span>
                    <input
                        type="text"
                        aria-describedby="helper-text-explanation"
                        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                        w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Código postal"
                        value={props.checkoutData.shipment.zipCode}
                        onChange={(event) => props.checkoutData.shipment.updateZipCode(event.target.value)}
                        required
                    />
                </>
            )}

            <fieldset>
                <legend className="sr-only">Seleccione una sucursal</legend>
                <div className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <Dropdown 
                        value={selectedPO} 
                        onChange={(e) => {
                            setSelectedPO(e.value); 
                            if(e.value.price)
                                updatePOPrice(e.value.price); // Set shipping amount using price
                        }} 
                        options={postOffices} 
                        optionLabel="label" 
                        placeholder="Seleccione una Sucursal" 
                        className="w-full md:w-14rem" 
                    />
                </div>
            </fieldset>
        </form>
    );
}
