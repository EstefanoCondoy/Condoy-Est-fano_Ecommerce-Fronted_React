import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { ecommerceApi } from "../api/client";
import type {
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
  User
} from "../types";

interface AuthContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  updateProfile: (payload: UpdateUserPayload) => Promise<User>;
  logout: () => void;
}

const STORAGE_KEY = "coltis.currentUser";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function storedUser(): User | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(storedUser);

  const remember = useCallback((user: User) => {
    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const user = await ecommerceApi.users.login(payload);
    remember(user);
    return user;
  }, [remember]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const user = await ecommerceApi.users.register(payload);
    remember(user);
    return user;
  }, [remember]);

  const updateProfile = useCallback(async (payload: UpdateUserPayload) => {
    if (!currentUser) {
      throw new Error("Debes iniciar sesión para actualizar el perfil.");
    }
    const updated = await ecommerceApi.users.update(currentUser.userId, payload);
    remember(updated);
    return updated;
  }, [currentUser, remember]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    currentUser,
    isAuthenticated: Boolean(currentUser),
    login,
    register,
    updateProfile,
    logout
  }), [currentUser, login, register, updateProfile, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  }
  return context;
}
