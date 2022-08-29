import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInRequest, signUpRequest } from "../services/auth/auth.service";

type ISignIn = {
  email: string;
  password: string;
};
type ISignUp = {
  email: string;
  password: string;
};

type User = {
  displayName?: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: ISignIn) => Promise<void>;
  signUp: (data: ISignUp) => Promise<void>;
  logout: () => void;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  async function signIn({ email, password }: ISignIn) {

    const { data } = await signInRequest({ email, password });
    if (!data.providerData[0]) {
      return data;
    }

    setUser(data.providerData[0]);
    localStorage.setItem("user", JSON.stringify(data.providerData[0]));
    localStorage.setItem("auth_token", JSON.stringify(data.stsTokenManager));

    navigate("/");
  }

  async function signUp({ email, password }: ISignUp) {

    const { data } = await signUpRequest({ email, password });
    if (!data.providerData) {
      return data;
    }
    setUser(data.providerData[0]);
    localStorage.setItem("user", data.providerData[0]);
    navigate("/");
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  }

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(JSON.stringify(data));
      setUser(user);
      navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
