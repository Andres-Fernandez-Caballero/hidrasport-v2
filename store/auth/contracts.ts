import { LoginDto, RegisterDto } from "@interfaces/IAuth";
import { PaymentMethod } from "@interfaces/Ipayment";

export interface AuthData {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  admin: boolean;
  paymentMethods: PaymentMethod[];
  profile: Profile;
}

export interface Profile {
  address: string;
  street_number: number;
  PC: number;
  telephone: number;
  depto: string;
  province: string;
  city: string;
  neighbourhood: string;
  mayorista: boolean;
  business: boolean;
}


  export interface AuthStore {
    userSession: AuthData;
    login: (loginData: LoginDto) => Promise<void>;
    logout: () => void;
    register: (registerDto: RegisterDto) => Promise<void>;
    isLogedIn: () => boolean;
  }