import { createContext, useContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (form: {firstName: string, lastName: string, email: string, password: string}) => Promise<boolean>;
  logout: () => Promise<boolean>;
  loginError: string;
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
