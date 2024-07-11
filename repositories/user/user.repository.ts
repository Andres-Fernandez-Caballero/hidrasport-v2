import urls from '../../app/config/urls';
import { LoginDto } from "@interfaces/IAuth";
import { ErrorResponse, LoginResponse } from "./contracts";

export const Login = async(loginData: LoginDto):Promise<LoginResponse> => {
    console.log(urls.login);
    const response = await fetch(urls.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}