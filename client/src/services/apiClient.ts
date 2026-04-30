const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface ApiRequestOptions {
  endpoint: string;
  method?: string;
  body?: string;
  accessToken?: string | null;
  onUnauthorized?: () => void;
}

export async function apiRequest<T>({
  endpoint,
  method = "GET",
  body,
  accessToken,
  onUnauthorized,
}: ApiRequestOptions): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body,
    credentials: "include",
  });

  if (res.status === 401 || res.status === 403) {
    onUnauthorized?.();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
