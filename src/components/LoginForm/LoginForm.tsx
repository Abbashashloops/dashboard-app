"use client";

/**
 * Login form with react-hook-form validation. On success, updates Zustand
 * and cookie then redirects so middleware and client stay in sync.
 */
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { setAuthCookie } from "@/utils/cookie";
import { isValidEmail, required } from "@/utils/validation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type LoginFormValues = {
  email: string;
  password: string;
};

const MOCK_TOKEN = "mock-jwt-token";

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  function onSubmit() {
    setAuth(MOCK_TOKEN);
    setAuthCookie(MOCK_TOKEN);
    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-8 shadow-lg"
      noValidate
    >
      <div className="text-center">
        <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to continue</p>
      </div>
      <h2 className="sr-only">Sign in</h2>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          validate: (value) => (isValidEmail(value) ? true : "Enter a valid email"),
        })}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          validate: (value) => (required(value) ? true : "Password is required"),
        })}
      />
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
