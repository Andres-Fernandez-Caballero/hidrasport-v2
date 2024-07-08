import { LoginDto } from "@interfaces/IAuth"
import { CREDIT_CARD_PAYMENT } from "@interfaces/IpaymentMethods";
import { Login } from "@repositories/user/user.repository"
import { AuthData } from "@store/auth/contracts";

export const fetchLogin = async(loginData: LoginDto) => {
    try{
        const data = await Login(loginData);
        return {...data, paymentMethods:[CREDIT_CARD_PAYMENT] } as AuthData;
        
    }catch(err) {
        throw new Error("Credenciales incorrectas");
    }
}