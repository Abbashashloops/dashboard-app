"use client";

/**
 * Re-syncs auth cookie from Zustand store on mount so new-tab navigations
 * to /dashboard work when the user is already logged in (store rehydrated from localStorage).
 */
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { setAuthCookie } from "@/utils/cookie";

export function AuthHydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { isAuthenticated, token } = useAuthStore.getState();
    if (isAuthenticated && token) {
      setAuthCookie(token);
    }
  }, []);

  return <>{children}</>;
}
