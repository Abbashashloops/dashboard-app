"use client";

/**
 * DataTable: filter (name/email) → sort → paginate. Receives full list and
 * handles all three concerns so the parent only manages data source.
 */
import { useEffect, useMemo, useState } from "react";
import type { User } from "@/services/api";
import { ColumnHeader } from "./ColumnHeader";
import { TableRow } from "./TableRow";
import { Pagination } from "@/components/Pagination/Pagination";

const ROWS_PER_PAGE = 5;
type SortDirection = "asc" | "desc" | null;

export type TableStats = {
  filteredCount: number;
  totalPages: number;
};

type DataTableProps = {
  users: User[];
  onStatsChange?: (stats: TableStats) => void;
};

export function DataTable({ users, onStatsChange }: DataTableProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const [sort, setSort] = useState<{ key: string; direction: SortDirection }>({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, filterQuery]);

  const sorted = useMemo(() => {
    const key = sort.key as keyof User;
    const dir = sort.direction === "desc" ? -1 : 1;
    return [...filtered].sort((a, b) => {
      const aVal = key === "company" ? (a.company?.name ?? "") : (a[key] as string);
      const bVal = key === "company" ? (b.company?.name ?? "") : (b[key] as string);
      return String(aVal).localeCompare(String(bVal), undefined, { numeric: true }) * dir;
    });
  }, [filtered, sort.key, sort.direction]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return sorted.slice(start, start + ROWS_PER_PAGE);
  }, [sorted, page]);

  useEffect(() => {
    onStatsChange?.({ filteredCount: sorted.length, totalPages });
  }, [sorted.length, totalPages, onStatsChange]);

  const handleSort = (key: string) => {
    setSort((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search by name or email…"
            value={filterQuery}
            onChange={(e) => {
              setFilterQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-600 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            aria-label="Filter by name or email"
          />
        </div>
        <p className="text-sm text-slate-600">
          Showing {paginated.length} of {sorted.length} row{sorted.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-[#F1F5F9]">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                <ColumnHeader
                  label="Name"
                  sortKey="name"
                  currentSort={sort}
                  onSort={handleSort}
                />
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <ColumnHeader
                  label="Email"
                  sortKey="email"
                  currentSort={sort}
                  onSort={handleSort}
                />
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <ColumnHeader
                  label="Phone"
                  sortKey="phone"
                  currentSort={sort}
                  onSort={handleSort}
                />
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <ColumnHeader
                  label="Website"
                  sortKey="website"
                  currentSort={sort}
                  onSort={handleSort}
                />
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <ColumnHeader
                  label="Company"
                  sortKey="company"
                  currentSort={sort}
                  onSort={handleSort}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((user) => (
              <TableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
