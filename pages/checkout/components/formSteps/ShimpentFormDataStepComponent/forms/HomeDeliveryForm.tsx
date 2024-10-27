import InputFormComponent from "@components/common/forms/input.component";
import { CheckoutFormDataProps } from "@pages/checkout/components/contracts";


const HomeDeliveryForm = (props: CheckoutFormDataProps) => (
    <form>
        <h2 className="font-bold">Datos de envio</h2>

        {props.checkoutData.shipment.haveZipCode() && (
            <>
                <span>Código Postal</span>
                <input
                    type="text"
                    aria-describedby="helper-text-explanation"
                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Código postal"
                    value={props.checkoutData.shipment.zipCode}
                    onChange={(event) => props.checkoutData.shipment.updateZipCode(event.target.value)}
                    required
                />
            </>
        )}

        <fieldset>
            <legend className="sr-only">Datos de envio</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 ">
                <InputFormComponent
                    label="Calle"
                    name="street"
                    type="text"
                    className="mb-2"
                    />
                <InputFormComponent
                    label="Altura"
                    name="number"
                    type="number"
                    className="mb-2"
                    />
                <InputFormComponent
                    label="Depto / Piso"
                    name="depto"
                    type="text"
                    className="mb-2"
                    />

                <InputFormComponent
                    label="Barrio"
                    name="neighborhood"
                    type="text"
                    className="mb-2"
                    />
                <InputFormComponent
                    label="Ciudad"
                    name="city"
                    type="text"
                    className="mb-2"
                    />
                <InputFormComponent
                    label="Provincia"
                    name="state"
                    type="text"
                    className="mb-2"
                    />
            </div>
        </fieldset>
    </form>
)

export default HomeDeliveryForm;