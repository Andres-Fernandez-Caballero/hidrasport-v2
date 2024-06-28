interface Response {
    message: string;
}

export interface LoginResponse extends Response {
    username: string;
    email: string;
    token: string;
    admin: boolean;
  }

  export interface ErrorResponse extends Response {
  }