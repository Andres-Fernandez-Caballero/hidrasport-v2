export const CREDIT_CARD_PAYMENT = "Tarjeta de Credito";
export const BANK_TRANSFER = 'Transferencia bancaria'
// const CASH_PAYMENT = "Efectivo";

export type PaymentMethod = typeof CREDIT_CARD_PAYMENT | typeof BANK_TRANSFER;
