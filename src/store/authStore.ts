/**
 * Single source of auth truth. Persists token to localStorage so middleware
 * and client components can enforce protected routes and show auth state.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

const AUTH_STORAGE_KEY = "dashboard-auth";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string) => void;
  clearAuth: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setAuth: (token) => set({ token, isAuthenticated: true }),
      clearAuth: () => set({ token: null, isAuthenticated: false }),
      hydrate: () => {},
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
