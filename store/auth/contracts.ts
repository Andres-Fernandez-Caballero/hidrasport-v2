import { RegisterDto } from "@interfaces/IAuth";
import { PaymentMethod } from "@interfaces/IpaymentMethods";

export interface AuthData {
    token: string;
    email: string;
    username: string;
    admin: boolean;
    paymentMethods: PaymentMethod[]
  }

  export interface AuthStore {
    userSession: AuthData;
    login: (authData: AuthData) => void;
    logout: () => void;
    register: (registerDto: RegisterDto) => Promise<void>;
    isLogedIn: () => boolean;
  }