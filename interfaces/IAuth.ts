import * as yup from "yup";
import { IPagination } from "./IPagination";
export interface IUser {
  email: string;
  username: string;
  token: string;
}

interface IResponse {
  reponse: string;
}

export interface IAuthSuccessfulResponse extends IUser, IResponse {}
export interface IAuthFailedResponse extends IResponse {}

export interface LoginDto {
    username: string; // email or username
    password: string;
    
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface UserSearchRequest {
  username: string;
}

export interface UserSearchResponse {
  id: number;
  username: string;
}

export interface UserSearchPaginatedResponse extends IPagination {
  results: UserSearchResponse[];
}
