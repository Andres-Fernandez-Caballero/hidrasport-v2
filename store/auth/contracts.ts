import { LoginDto, RegisterDto } from "@interfaces/IAuth";
import { PaymentMethod } from "@interfaces/Ipayment";

export interface AuthData {
    token: string;
    email: string;
    username: string;
    admin: boolean;
    paymentMethods: PaymentMethod[]
  }

  export interface AuthStore {
    userSession: AuthData;
    login: (loginData: LoginDto) => Promise<void>;
    logout: () => void;
    register: (registerDto: RegisterDto) => Promise<void>;
    isLogedIn: () => boolean;
  }