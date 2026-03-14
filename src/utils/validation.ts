/**
 * Shared validation helpers used by react-hook-form and any other validators.
 * Keeps validation rules in one place for consistency.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}


export function required(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
