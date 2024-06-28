export  const CREDIT_CARD = 'Tarjeta de credito';
export const BANK_TRANSFER = 'Transferencia bancaria'

export type PaymentMethod = typeof CREDIT_CARD | typeof BANK_TRANSFER;