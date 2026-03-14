"use client";

/**
 * App shell for dashboard: fixed sidebar (nav) + main content with top header.
 * On mobile, sidebar is hidden and a top bar shows logo + sign out.
 */
import Link from "next/link";

type DashboardShellProps = {
  children: React.ReactNode;
  title: string;
  rightSlot?: React.ReactNode;
};

export function DashboardShell({ children, title, rightSlot }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar — hidden on mobile */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-[240px] flex-col border-r border-slate-800 bg-[#0F172A] md:flex">
        <div className="flex h-14 items-center border-b border-slate-800 px-5">
          <Link href="/dashboard" className="text-lg font-semibold text-white">
            Dashboard
          </Link>
        </div>
        <nav className="flex-1 p-3">
          <Link
            href="/dashboard"
            className="flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
          >
            Users
          </Link>
        </nav>
      </aside>

      {/* Mobile top bar — visible only on small screens */}
      <div className="fixed left-0 right-0 top-0 z-20 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:hidden">
        <span className="text-lg font-semibold text-slate-800">Dashboard</span>
        <div className="flex items-center gap-2">{rightSlot}</div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:pl-[240px]">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
          <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
          <div className="hidden items-center gap-4 md:flex">{rightSlot}</div>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
