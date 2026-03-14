/**
 * Previous/next and page-number buttons; parent controls current page and total.
 */
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const pageNumbers: number[] = [];
  const showPages = 5;
  let start = Math.max(1, currentPage - Math.floor(showPages / 2));
  const end = Math.min(totalPages, start + showPages - 1);
  if (end - start + 1 < showPages) start = Math.max(1, end - showPages + 1);
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <nav aria-label="Table pagination" className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrev}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Previous page"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {pageNumbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onPageChange(num)}
            className={`min-w-[2.25rem] rounded-full px-3 py-2 text-sm font-medium transition-colors ${
              num === currentPage
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
            }`}
            aria-label={`Page ${num}`}
            aria-current={num === currentPage ? "page" : undefined}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
