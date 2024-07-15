export interface IPermissionLevel{
  b2b: boolean;
  admin: boolean;
  anonymous: boolean;
}

export interface IPermissionResponse{
  authResponse: IPermissionLevel | null;
  authError: Error | null;
  authLoading: boolean;
}