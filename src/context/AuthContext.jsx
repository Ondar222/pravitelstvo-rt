import React from "react";
import { AuthApi, setAuthToken, getAuthToken } from "../api/client.js";

const AuthContext = React.createContext({
  user: null,
  token: "",
  isAuthenticated: false,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [token, setToken] = React.useState(() => getAuthToken());
  const [user, setUser] = React.useState(null);
  const isAuthenticated = Boolean(token);

  const saveAuth = React.useCallback((payload) => {
    const newToken =
      payload?.token || payload?.accessToken || payload?.access_token || "";
    setToken(newToken);
    setAuthToken(newToken);
    if (payload?.user) setUser(payload.user);
  }, []);

  const register = React.useCallback(async (form) => {
    const res = await AuthApi.register(form);
    return res;
  }, []);

  const login = React.useCallback(
    async ({ email, password }) => {
      // Try API first (if configured)
      try {
        const res = await AuthApi.loginWithPassword({ email, password });
        // If API вернул ответ, но без токена — попробуем локальный доступ
        const apiToken =
          res?.token || res?.accessToken || res?.access_token || "";
        const isLocalMatch =
          String(email).toLowerCase() ===
            "arslanondar2003@gmail.com".toLowerCase() &&
          String(password) === "Tc7yf6rt!.";
        if (!apiToken && isLocalMatch) {
          const localUser = {
            id: "local-admin",
            email: "arslanondar2003@gmail.com",
            name: "Administrator",
            role: "admin",
          };
          saveAuth({ token: "local-admin-token", user: localUser });
          return { user: localUser, token: "local-admin-token" };
        }
        saveAuth(res || {});
        return res;
      } catch (e) {
        // Fallback: local single admin access (no backend)
        const isLocalMatch =
          String(email).toLowerCase() ===
            "arslanondar2003@gmail.com".toLowerCase() &&
          String(password) === "Tc7yf6rt!.";
        if (isLocalMatch) {
          const localUser = {
            id: "local-admin",
            email: "arslanondar2003@gmail.com",
            name: "Administrator",
            role: "admin",
          };
          saveAuth({ token: "local-admin-token", user: localUser });
          return { user: localUser, token: "local-admin-token" };
        }
        throw e;
      }
    },
    [saveAuth]
  );

  const logout = React.useCallback(() => {
    saveAuth({});
    setUser(null);
  }, [saveAuth]);

  const value = React.useMemo(
    () => ({ user, token, isAuthenticated, register, login, logout }),
    [user, token, isAuthenticated, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
