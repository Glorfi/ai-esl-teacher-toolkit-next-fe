export interface ISignInResponse {
  jwt: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface IAuthMagicRequest {
  email: string;
  token: string;
}

export interface ILoginMagicRequest {
  email: string;
}
