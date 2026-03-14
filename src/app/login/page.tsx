import { LoginForm } from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <LoginForm />
    </main>
  );
}
