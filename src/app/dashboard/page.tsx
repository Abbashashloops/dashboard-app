"use client";

/**
 * Dashboard: fetches users from API, merges with locally added users,
 * and renders table + add-user form. Loading/error/empty handled here.
 */
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { clearAuthCookie } from "@/utils/cookie";
import { fetchUsers } from "@/services/api";
import type { User } from "@/services/api";
import type { TableStats } from "@/components/Table/DataTable";
import { DataTable } from "@/components/Table/DataTable";
import { UserForm } from "@/components/UserForm/UserForm";
import { DashboardShell } from "@/components/DashboardShell";

export default function DashboardPage() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [apiUsers, setApiUsers] = useState<User[]>([]);
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableStats, setTableStats] = useState<TableStats>({
    filteredCount: 0,
    totalPages: 1,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUsers()
      .then((data) => {
        if (!cancelled) setApiUsers(data);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load users. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddUser = (payload: Omit<User, "id">) => {
    const id = -Date.now();
    setLocalUsers((prev) => [{ ...payload, id }, ...prev]);
  };

  const allUsers = [...localUsers, ...apiUsers];
  const onStatsChange = useCallback((stats: TableStats) => setTableStats(stats), []);

  const handleLogout = () => {
    clearAuth();
    clearAuthCookie();
    window.location.href = "/login";
  };

  const rightSlot = (
    <>
      <span className="text-sm text-slate-600">User</span>
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-medium text-red-400 transition-colors hover:text-red-600"
      >
        Sign out
      </button>
    </>
  );

  return (
    <DashboardShell title="Users" rightSlot={rightSlot}>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Total Users</p>
                <p className="text-xl font-semibold text-slate-800">{allUsers.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Showing</p>
                <p className="text-xl font-semibold text-slate-800">{tableStats.filteredCount}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Pages</p>
                <p className="text-xl font-semibold text-slate-800">{tableStats.totalPages}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            {loading && (
              <div className="rounded-xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
                Loading users…
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-800 shadow-sm">
                {error}
              </div>
            )}
            {!loading && !error && allUsers.length === 0 && (
              <div className="rounded-xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
                No users yet. Add one with the form.
              </div>
            )}
            {!loading && !error && allUsers.length > 0 && (
              <DataTable users={allUsers} onStatsChange={onStatsChange} />
            )}
          </div>

          <div className="w-full shrink-0 lg:w-[340px]">
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <UserForm onSubmit={handleAddUser} />
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
