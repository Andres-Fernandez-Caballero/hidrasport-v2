export const PICKUP_POINT = "Retiro en deposito Hidra";
export const HOME_DELIVERY = "Envio a Domicilio";
export const BRANCH_DELIVERY = "Envio a Sucursal mas Cercana";

export type ShippingType = typeof HOME_DELIVERY | typeof PICKUP_POINT | typeof BRANCH_DELIVERY;




// Options for the payment method menu

// Options for the shipping method menu
export const shippingTypes: ShippingType[] = [
  HOME_DELIVERY,
  PICKUP_POINT,
  BRANCH_DELIVERY,
];