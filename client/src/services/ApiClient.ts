import { ApiError } from "./ApiError";

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string>;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "/api";

interface ApiRequestOptions {
  endpoint: string;
  method?: string;
  body?: string;
  skipAuthRefresh?: boolean;
}

let refreshAccessToken: (() => Promise<string | null>) | null = null;
let getAccessToken: (() => string | null) | null = null;
let forceLogout: (() => void) | null = null;
let refreshPromise: Promise<string | null> | null = null;

export const setAuthHandlers = (handlers: {
  refreshAccessToken: () => Promise<string | null>;
  getAccessToken: () => string | null;
  forceLogout: () => void;
}) => {
  refreshAccessToken = handlers.refreshAccessToken;
  getAccessToken = handlers.getAccessToken;
  forceLogout = handlers.forceLogout;
};

export async function apiRequest<T>({
  endpoint,
  method = "GET",
  body,
  skipAuthRefresh = false,
}: ApiRequestOptions): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const makeRequest = async (token?: string | null) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, {
      method,
      headers,
      body,
      credentials: "include",
    });
  };

  const token = getAccessToken?.() ?? null;
  let res = await makeRequest(token);

  if (!skipAuthRefresh && (res.status === 401 || res.status === 403)) {
    if (!refreshPromise) {
      refreshPromise = (refreshAccessToken?.() ?? Promise.resolve(null)).finally(
        () => { refreshPromise = null; }
      );
    }

    const newToken = await refreshPromise;

    if (!newToken) {
      forceLogout?.();
      throw new Error("Session expired");
    }

    res = await makeRequest(newToken);
  }

  if (!res.ok) {
    const data = await res.json().catch((): ApiErrorResponse => ({}));
    throw new ApiError(res.status, data.message ?? "Request failed", data.errors);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
