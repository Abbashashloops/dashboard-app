/**
 * Auth cookie helpers. Middleware can only read cookies, not localStorage,
 * so we set a cookie on login and clear it on logout for route protection.
 */
const AUTH_COOKIE_NAME = "dashboard-auth";

export function setAuthCookie(token: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=86400`;
}

export function clearAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
}
