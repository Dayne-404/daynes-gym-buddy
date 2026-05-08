import { createContext, useContext } from "react";
import type { RegisterForm } from "../types/form.types";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (form: RegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  authInitializing: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
