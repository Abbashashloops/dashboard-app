type SortDirection = "asc" | "desc" | null;

type ColumnHeaderProps = {
  label: string;
  sortKey: string;
  currentSort: { key: string; direction: SortDirection };
  onSort: (key: string) => void;
};

export function ColumnHeader({ label, sortKey, currentSort, onSort }: ColumnHeaderProps) {
  const isActive = currentSort.key === sortKey;
  const direction = isActive ? currentSort.direction : null;

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className="flex items-center gap-1 whitespace-nowrap text-left text-sm font-semibold text-slate-600 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
    >
      {label}
      {direction === "asc" && <span aria-hidden>↑</span>}
      {direction === "desc" && <span aria-hidden>↓</span>}
    </button>
  );
}
