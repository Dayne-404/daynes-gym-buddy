import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { apiRequest, setAuthHandlers } from "../../../services/apiClient";
import { useUser } from "@/features/user";
import { AuthContext } from "@/features/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authInitializing, setAuthInitializing] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const { setUser } = useUser();
  const hasTriedRefresh = useRef(false);

  const isAuthenticated = !!accessToken;

  const applyAuthData = useCallback(
  (data: { accessToken?: string; user?: User }) => {
    if (!data?.accessToken || !data?.user) {
      throw new Error("Missing auth response data");
    }

    setAccessToken(data.accessToken);
    setUser(data.user);
  },
  [setUser],
);

  const register = async (form: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    console.log("Registering...");
    setLoading(true);
    setLoginError("");

    try {
      const data = await apiRequest<{ user: User, accessToken: string }>({
        method: "POST",
        endpoint: "/auth/register",
        body: JSON.stringify(form),
      });

      applyAuthData(data);
      return true;
    } catch (error) {
      console.error("Register failed:", error);
      setAccessToken(null);
      setUser(null);

      const errorMsg = error instanceof Error ? error.message : String(error);
      setLoginError(errorMsg);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Logging in...");
    setLoading(true);
    setLoginError("");

    try {
      const data = await apiRequest<{ user: User, accessToken: string }>({
        method: "POST",
        endpoint: "/auth/login",
        body: JSON.stringify({ email, password }),
      });

      applyAuthData(data);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setAccessToken(null);
      setUser(null);

      const errorMsg = error instanceof Error ? error.message : String(error);
      setLoginError(errorMsg);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async (): Promise<boolean> => {
    console.log("Logging out...");
    try {
      await apiRequest({
        method: "POST",
        endpoint: "/auth/logout",
      });

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setAccessToken(null);
    setUser(null);
    return true;
  }, [setUser]);

  useLayoutEffect(() => {
    if (hasTriedRefresh.current) return;
    hasTriedRefresh.current = true;

    const restoreAccessToken = async () => {
      console.log("Restoring access token...");
      try {
        const data = await apiRequest<{ user: User, accessToken: string }>({
          endpoint: "/auth/refresh",
          method: "POST",
          skipAuthRefresh: true,
        });

        applyAuthData(data);
      } catch (error) {
        console.error("Failed to restore access token:", error);
        logout();
      } finally {
        setAuthInitializing(false);
      }
    };

    restoreAccessToken();
  }, [applyAuthData, logout]);

  useEffect(() => {
    setAuthHandlers({
      refreshAccessToken: async () => {
        try {
          const data = await apiRequest<{ user: User, accessToken: string }>({
            method: "POST",
            endpoint: "/auth/refresh",
          });

          applyAuthData(data);
          return data.accessToken;
        } catch {
          return null;
        }
      },

      getAccessToken: () => {
        return accessToken;
      },

      forceLogout: () => {
        logout();
      },
    });
  }, [applyAuthData, accessToken, logout]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        login,
        loginError,
        logout,
        loading,
        register,
        isAuthenticated,
        authInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
