import { LoginDto } from "@interfaces/IAuth"
import { Login } from "@repositories/user/user.repository"

export const fetchLogin = async(loginData: LoginDto) => {
    try{
        return await Login(loginData);
    }catch(err) {
        throw new Error("Credenciales incorrectas");
    }
}