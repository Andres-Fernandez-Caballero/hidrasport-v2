import { AuthData } from "@store/auth.store";

export interface ErrorResponse{
    message: string;
}

export type Data = AuthData | ErrorResponse