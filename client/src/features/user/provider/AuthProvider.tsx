import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { apiRequest } from "../../../services/apiClient";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/UserContext";
import { AuthContext } from "../../auth/context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authInitializing, setAuthInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const { setUser } = useUser();
  const hasTriedRefresh = useRef(false);

  const isValidUserPayload = (payload: User): boolean => {
    return (
      payload &&
      typeof payload.userId === "number" &&
      typeof payload.email === "string" &&
      typeof payload.firstName === "string" &&
      typeof payload.lastName === "string" &&
      typeof payload.avatarColor === "string"
    );
  };

  const applyAuthData = useCallback(
    (data: { accessToken: string | undefined }) => {
      if (!data?.accessToken) {
        throw new Error("Missing access token");
      }

      const decoded = jwtDecode(data.accessToken) as User;

      if (!isValidUserPayload(decoded)) {
        console.error("Invalid token payload", decoded);
        throw new Error("Invalid token payload");
      }

      setUser(decoded);
      setAccessToken(data.accessToken);
    },
    [setUser],
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Logging in...");
    setLoading(true);
    setLoginError("");

    try {
      const data = await apiRequest<{ accessToken: string }>({
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
    setIsAuthenticated(false);
    return true;
  }, [setUser]);

  useLayoutEffect(() => {
    if (hasTriedRefresh.current) return;
    hasTriedRefresh.current = true;

    const restoreAccessToken = async () => {
      console.log("Restoring access token...");
      try {
        const data = await apiRequest<{ accessToken: string }>({
          endpoint: "/auth/refresh",
          method: "POST",
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

  useLayoutEffect(() => {
    const updateState = () => {
        setIsAuthenticated(!!accessToken);
    }
    
    updateState()
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        login,
        loginError,
        logout,
        loading,
        isAuthenticated,
        authInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
