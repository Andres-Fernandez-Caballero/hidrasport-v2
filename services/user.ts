import { LoginDto, RegisterDto } from "@interfaces/IAuth"
import { CREDIT_CARD_PAYMENT } from "@interfaces/Ipayment";
import { Login, Register } from "@repositories/user/user.repository"
import { AuthData } from "@store/auth/contracts";

export const fetchLogin = async(loginData: LoginDto): Promise<AuthData> => {
  try{
      const data = await Login(loginData);
      
      const authData: AuthData = {
          ...data,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          profile: data.profile || "",
      };

      return authData;
  } catch (err) {
      throw new Error("Credenciales incorrectas");
  }
}

export const fetchRegister = async(registerData: RegisterDto): Promise<AuthData> => {
    try {
        const data = await Register(registerData);
        //@ts-ignore
        return { ... data, paymentMethods: [CREDIT_CARD_PAYMENT], admin:false }
    }catch (err) {
        throw new Error( (err as Error).message);
    }
}