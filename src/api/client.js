// Simple API client with auth token support and JSON helpers
function resolveApiBaseUrl() {
  // 1) Runtime override via window.__API_BASE_URL__
  if (typeof window !== "undefined" && window.__API_BASE_URL__) {
    return String(window.__API_BASE_URL__);
  }
  // 2) Runtime override via <meta name="api-base" content="...">
  if (typeof document !== "undefined") {
    const meta = document.querySelector('meta[name="api-base"]');
    if (meta && meta.content) return meta.content;
  }
  // 3) Build-time env
  const fromEnv = import.meta?.env?.VITE_API_BASE_URL;
  if (fromEnv) return String(fromEnv);
  // 4) Safe default to public API host
  return "https://ai.tyvan.ru";
}
const API_BASE_URL = resolveApiBaseUrl();
const TOKEN_STORAGE_KEY =
  import.meta?.env?.VITE_API_TOKEN_STORAGE_KEY || "auth_token";

export function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export async function apiFetch(
  path,
  { method = "GET", body, headers, auth = true } = {}
) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured");
  }
  const url =
    API_BASE_URL.replace(/\/+$/, "") + "/" + String(path).replace(/^\/+/, "");
  const finalHeaders = {
    Accept: "application/json",
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...(headers || {}),
  };
  if (auth) {
    const token = getAuthToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
  const isJson = (res.headers.get("content-type") || "").includes(
    "application/json"
  );
  const data = isJson ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    const err = new Error(
      (data && (data.message || data.error)) || `Request failed: ${res.status}`
    );
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function tryApiFetch(path, options) {
  try {
    return await apiFetch(path, options);
  } catch {
    return null;
  }
}

export const AuthApi = {
  async register(user) {
    return apiFetch("/user", { method: "POST", body: user, auth: false });
  },
  async loginWithPassword({ email, password }) {
    return apiFetch("/auth/login/password", {
      method: "POST",
      body: { email, password },
      auth: false,
    });
  },
};

export const PublicApi = {
  async listPersons() {
    return apiFetch("/persons", { method: "GET", auth: false });
  },
  async listNews() {
    return apiFetch("/news", { method: "GET", auth: false });
  },
};
