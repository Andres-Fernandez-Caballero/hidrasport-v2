import { LoginDto, RegisterDto } from "@interfaces/IAuth";
import { PaymentMethod } from "@interfaces/Ipayment";
import initialState from "./initalState";

export interface AuthData {
  token: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  admin: boolean;
  paymentMethods: PaymentMethod[];
  profile: Profile;
}

export interface Profile {
  address: string;
  street_number: number;
  PC: number;
  telephone: number | null;
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
  updateUserSession: (
    data: Partial<Omit<AuthData, 'profile'>> & { profile?: Partial<AuthData['profile']> }
  ) => void;
}

