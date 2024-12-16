import { PaymentMethod } from "@interfaces/Ipayment";
import { Profile } from "@store/auth/contracts";

interface Response {
    message: string;
}

export interface LoginResponse extends Response {
    username: string;
    email: string;
    token: string;
    admin: boolean;
    paymentMethods: PaymentMethod[];
    firstName: string;
    lastName: string;
    profile: Profile;
}

export interface RegisterResponse extends Response {
    email: string;
    username: string;
    token: string;
}

export interface ErrorResponse extends Response {
}