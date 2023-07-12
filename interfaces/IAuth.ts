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

