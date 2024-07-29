import urls from '../../app/config/urls';
import { LoginDto } from "@interfaces/IAuth";
import { LoginResponse, RegisterResponse } from "./contracts";

export const Login = async (loginData: LoginDto): Promise<LoginResponse> => {
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
    
    if (!response.ok) { 
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return response.json();
};

export const Register = async(loginData: LoginDto): Promise<RegisterResponse> => {
    const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
    return response.json();
}
