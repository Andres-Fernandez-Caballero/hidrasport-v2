import { PaymentMethod } from "@interfaces/IpaymentMethods";
import { ShippingType } from "@interfaces/IShipping";

interface IUseCheckout {
    shippingType: ShippingType;
    handleOnPaymentMethodChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnShippingTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clearZipCode: () => void;
    haveZipCode: () => boolean;
    zipCode: string;
    updateZipCode: (zipCode: string) => void;
    shippingAmount?: number;
    paymentMethod: PaymentMethod;
}

export default IUseCheckout;    