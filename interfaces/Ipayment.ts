export const CREDIT_CARD_PAYMENT = "Tarjeta de Credito";
export const BANK_TRANSFER = "Transferencia bancaria";
export const TEST_PAYMENT = "Test";
export const TEST_NO_CARD_PAYMENT = "Test No Card";

export type PaymentMethod = 
  | typeof CREDIT_CARD_PAYMENT
  | typeof BANK_TRANSFER
  | typeof TEST_PAYMENT
  | typeof TEST_NO_CARD_PAYMENT;

  export interface IPaymentResponse {
    response: string;
  }

  export interface ICouponResponse {
    detail: string;
    name: string;
    value: number;
    min_purchase_value: number;
  }