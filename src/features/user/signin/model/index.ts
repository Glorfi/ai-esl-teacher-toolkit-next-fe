export interface ISignInResponse {
  jwt: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}
