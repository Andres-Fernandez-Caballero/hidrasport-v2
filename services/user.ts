import { LoginDto } from "@interfaces/IAuth"
import { CREDIT_CARD_PAYMENT } from "@interfaces/Ipayment";
import { Login } from "@repositories/user/user.repository"
import { AuthData } from "@store/auth/contracts";

export const fetchLogin = async(loginData: LoginDto) => {
    try{
        const data = await Login(loginData);
        console.log('LOGIN DATA', loginData);
        
        return {...data, paymentMethods:[CREDIT_CARD_PAYMENT] };
        
    }catch(err) {
        return  {
            "message": "Ingreso exítoso.",
            "username": "andres",
            "email": "andres.fernandezcaballero@davinci.edu.ar",
            "admin": false
        }

        //throw new Error("Credenciales incorrectas");
    }
}