import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { apiRequest, setAuthHandlers } from "@/services/ApiClient";
import { useUser } from "@/features/user";
import type { User } from "@/features/user";
import { AuthContext } from "@/features/auth";
import type { RegisterForm } from "../types/form.types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const accessTokenRef = useRef<string | null>(null);
  const [authInitializing, setAuthInitializing] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const hasTriedRefresh = useRef(false);

  const isAuthenticated = !!accessToken;

  const updateAccessToken = useCallback((token: string | null) => {
    accessTokenRef.current = token;
    setAccessToken(token);
  }, []);

  const applyAuthData = useCallback(
    (data: { accessToken?: string; user?: User }) => {
      if (!data?.accessToken || !data?.user) {
        throw new Error("Missing auth response data");
      }

      updateAccessToken(data.accessToken);
      setUser(data.user);
    },
    [updateAccessToken, setUser],
  );

  const authAction = async <T,>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);

    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  };

  const register = (form: RegisterForm): Promise<void> =>
    authAction(async () => {
      const data = await apiRequest<{ user: User; accessToken: string }>({
        method: "POST",
        endpoint: "/auth/register",
        body: JSON.stringify(form),
      });

      applyAuthData(data);
    });

  const login = (email: string, password: string): Promise<void> =>
    authAction(async () => {
      const data = await apiRequest<{ user: User; accessToken: string, }>({
        method: "POST",
        endpoint: "/auth/login",
        body: JSON.stringify({ email, password }),
        skipAuthRefresh: true,
      });

      applyAuthData(data);
    });

  const clearAuthState = useCallback(() => {
    updateAccessToken(null);
    setUser(null);
  }, [updateAccessToken, setUser]);

  const logout = useCallback(async (): Promise<void> => {
    console.log("Logout...");

    try {
      await apiRequest({
        method: "POST",
        endpoint: "/auth/logout",
        skipAuthRefresh: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    clearAuthState();
  }, [clearAuthState]);

  useEffect(() => {
    if (hasTriedRefresh.current) return;
    hasTriedRefresh.current = true;

    const restoreAccessToken = async () => {
      console.log("Restoring access token...");
      try {
        const data = await apiRequest<{ user: User; accessToken: string }>({
          endpoint: "/auth/refresh",
          method: "POST",
          skipAuthRefresh: true,
        });

        applyAuthData(data);
      } catch (error) {
        console.error("Failed to restore access token:", error);
        clearAuthState();
      } finally {
        setAuthInitializing(false);
      }
    };

    restoreAccessToken();
  }, [applyAuthData, clearAuthState]);

  useEffect(() => {
    setAuthHandlers({
      refreshAccessToken: async () => {
        console.log("Refreshing access token...");
        try {
          const data = await apiRequest<{ user: User; accessToken: string }>({
            method: "POST",
            endpoint: "/auth/refresh",
            skipAuthRefresh: true,
          });

          applyAuthData(data);
          return data.accessToken;
        } catch {
          return null;
        }
      },

      getAccessToken: () => {
        return accessTokenRef.current;
      },

      forceLogout: () => {
        logout();
      },
    });
  }, [applyAuthData, logout]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken: updateAccessToken,
        login,
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
