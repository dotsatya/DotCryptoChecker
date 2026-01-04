import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "./DataTable";

// CoinOverview Fallback component with skeleton matching #coin-overview styles
export function CoinOverviewFallback() {
  return (
    <div id="coin-overview" className="content-card card-rounded">
      <div className="flex-row flex-gap-sm">
        <Skeleton className="w-[50px] h-100 img-rounded" />
        <div>
          <Skeleton className="h-4 w-32 text-muted" />
          <Skeleton className="h-6 w-24 text-title" />
        </div>
      </div>
    </div>
  );
}

// TrendingCoinsFallback component with skeleton table using DataTable
export function TrendingCoinsFallback() {
  const skeletonColumns = [
    {
      header: "Coin",
      headClassName: "table-text-left",
      cell: () => (
        <div className="flex-row-center gap-sm min-w-0">
          <div className="icon-wrap">
            <Skeleton className="w-6 h-6 img-contain" />
          </div>
          <div className="flex-col min-w-0">
            <Skeleton className="h-4 w-16 font-medium text-truncate" />
            <Skeleton className="h-3 w-12 text-xs-muted" />
          </div>
        </div>
      ),
    },
    {
      header: "24h Change",
      headClassName: "table-text-right",
      cellClassName: "table-text-right",
      cell: () => (
        <div className="trend-right">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-10" />
        </div>
      ),
    },
    {
      header: "Price",
      headClassName: "table-text-right",
      cellClassName: "table-text-right table-cell-strong",
      cell: () => <Skeleton className="h-4 w-16 table-cell-strong" />,
    },
  ];

  const skeletonData = Array.from({ length: 7 }, (_, i) => ({ id: i }));

  return (
    <section className="content-card">
      <p className="sub-heading mb-3">Trending Coins</p>
      <DataTable
        data={skeletonData}
        columns={skeletonColumns}
        rowKey={(row) => row.id}
      />
    </section>
  );
}

// CategoriesFallback component with skeleton table using DataTable
export function CategoriesFallback() {
  const skeletonColumns = [
    {
      header: "Category",
      headClassName: "table-text-left",
      cellClassName: "table-text-left table-cell-strong",
      cell: () => <Skeleton className="h-4 w-24 category-name" />,
    },
    {
      header: "Top Gainers",
      headClassName: "table-text-right table-hidden-lg",
      cellClassName: "table-text-right table-hidden-lg",
      cell: () => (
        <div className="category-coins">
          {Array.from({ length: 3 }, (_, j) => (
            <Skeleton key={j} className="w-[22px] h-[22px] category-coin-img" />
          ))}
        </div>
      ),
    },
    {
      header: "24h Change",
      headClassName: "table-text-right",
      cellClassName: "table-text-right table-cell-medium",
      cell: () => (
        <span className="trend">
          <Skeleton className="h-4 w-4 inline" />
          <Skeleton className="h-4 w-10 inline" />
        </span>
      ),
    },
    {
      header: "Market Cap",
      headClassName: "table-text-right table-hidden-md",
      cellClassName: "table-text-right table-hidden-md table-cell-medium table-numbers",
      cell: () => <Skeleton className="h-4 w-16" />,
    },
    {
      header: "24h Volume",
      headClassName: "table-text-right table-hidden-md",
      cellClassName: "table-text-right table-hidden-md table-cell-medium table-numbers",
      cell: () => <Skeleton className="h-4 w-16" />,
    },
  ];

  const skeletonData = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <section className="content-card">
      <p className="sub-heading mb-3">Top Categories</p>
      <DataTable
        columns={skeletonColumns}
        data={skeletonData}
        rowKey={(row) => row.id}
      />
    </section>
  );
}
