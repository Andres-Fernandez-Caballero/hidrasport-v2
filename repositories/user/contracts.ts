import { PaymentMethod } from "@interfaces/Ipayment";

interface Response {
    message: string;
}

export interface LoginResponse extends Response {
    username: string;
    email: string;
    token: string;
    admin: boolean;
    paymentMethods: PaymentMethod[];
}

export interface RegisterResponse extends Response {
    email: string;
    username: string;
    token: string;
}

export interface ErrorResponse extends Response {
}