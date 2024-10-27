import { PaymentMethod } from "@interfaces/Ipayment";
import { ShippingType } from "@interfaces/IShipping";
import { Focused } from "react-credit-cards-2";

interface IUseCheckout {
    shipmentForm: IUseShipmentForm;
    creditCardForm: IUseCreditCardForm;
    shipment: IUseShipment;
    totalAmountWithShipping: number;
}

export interface IUseShipment {
    handleOnShippingTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnPaymentMethodChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    shippingType: ShippingType;
    paymentMethod: PaymentMethod;
    clearZipCode: () => void;
    haveZipCode: () => boolean;
    zipCode: string;
    updateZipCode: (zipCode: string) => void;
    updatePOPrice: (priceShipping: number) => void;
    shippingAmount?: number;
}

export interface IUseShipmentForm {
    shipmentFormData: IShipmentFormData,
    clearShipmentFormData: () => void;
    handleOnChage: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export interface IShipmentFormData {
    name: string;
    lastname: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    number: string;
    depto: string;
    neighborhood: string;
  }

export interface IUseCreditCardForm{
    creditCard: CreditCard;
    handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ICreditCard {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
}

export interface CreditCard extends ICreditCard {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    focused?: Focused;
}



export default IUseCheckout;    