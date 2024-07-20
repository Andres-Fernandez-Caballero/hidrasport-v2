import { AuthData } from "@store/auth/contracts";

export interface ErrorResponse {
  message: string;
}

export type Data = AuthData | ErrorResponse;

export interface ResponseApi {
  status: number;
  message: string;
  data?: unknown;
}

export interface ResponseCartApi {
  message: string;
  quantity: number;
  product_total: number;
  cart_length: number;
  cart_total: number;
}
