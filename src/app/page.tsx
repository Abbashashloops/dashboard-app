import { redirect } from "next/navigation";

/**
 * Home: redirect to dashboard; middleware will send unauthenticated users to /login.
 */
export default function Home() {
  redirect("/dashboard");
}
