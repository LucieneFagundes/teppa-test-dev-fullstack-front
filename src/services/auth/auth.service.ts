import { api } from "../api";

interface ISignInRequest {
  email: string;
  password: string;
}
interface ISignUpRequest {
  email: string;
  password: string;
}

export async function signInRequest(data: ISignInRequest) {
  const response = await api.post(`/signin`, data);
  return response;
}
export async function signUpRequest(data: ISignUpRequest) {
  const response = await api.post(`/signup`, data);
  return response;
}
