/**
 * Root layout: wraps all pages with global styles and metadata.
 * AuthHydrator re-syncs auth cookie from store on load (fixes new-tab redirect bug).
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthHydrator } from "@/components/AuthHydrator";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Technical assessment mini dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-[#F8FAFC] text-slate-800 antialiased ${inter.className}`}>
        <AuthHydrator>{children}</AuthHydrator>
      </body>
    </html>
  );
}
