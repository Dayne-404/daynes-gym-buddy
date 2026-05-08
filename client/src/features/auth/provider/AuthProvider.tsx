import {
  useCallback,
  useEffect,
  useLayoutEffect,
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
  const [authInitializing, setAuthInitializing] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
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

  const logout = useCallback(async (): Promise<void> => {
    console.log("Logout...");

    try {
      await apiRequest({
        method: "POST",
        endpoint: "/auth/logout",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setAccessToken(null);
    setUser(null);
  }, [setUser]);

  useLayoutEffect(() => {
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
        console.log("Refreshing access token...");
        try {
          const data = await apiRequest<{ user: User; accessToken: string }>({
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
