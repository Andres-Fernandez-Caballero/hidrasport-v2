import { LoginDto, RegisterDto } from "@interfaces/IAuth"
import { CREDIT_CARD_PAYMENT } from "@interfaces/Ipayment";
import { Login, Register } from "@repositories/user/user.repository"
import { AuthData } from "@store/auth/contracts";
import { Payment } from "mercadopago";
import { FaConciergeBell } from "react-icons/fa";

export const fetchLogin = async(loginData: LoginDto): Promise<AuthData> => {
    try{
        const data = await Login(loginData);
        
        return data;
    }catch(err) {
        throw new Error("Credenciales incorrectas");
    }
}

export const fetchRegister = async(registerData: RegisterDto): Promise<AuthData> => {
    try {
        const data = await Register(registerData);
        return { ... data, paymentMethods: [CREDIT_CARD_PAYMENT], admin:false }
    }catch (err) {
        throw new Error( (err as Error).message);
    }
}