import { fetcher } from "@/lib/api.actions";
import DataTable from "../DataTable";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

const Categories = async () => {
  let categories: Category[] = [];

  try {
    categories = await fetcher<Category[]>(
      "/coins/categories",
      undefined,
      600 // 10 min cache (production-safe)
    );
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  if (!categories.length) {
    return (
      <section className="content-card p-4 text-sm text-stone-500">
        Failed to load categories.
      </section>
    );
  }

  // ✅ Sort by Market Cap (descending)
  const sortedCategories = [...categories].sort(
    (a, b) => b.market_cap - a.market_cap
  );

  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      headClassName: "text-left break-words whitespace-normal",
      cellClassName: "font-semibold break-words whitespace-normal",
      cell: (category) => (
        <span className="leading-tight">{category.name}</span>
      ),
    },
    {
      header: "Top Gainers",
      headClassName: "text-right hidden lg:table-cell",
      cellClassName: "text-right hidden lg:table-cell",
      cell: (category) => (
        <div className="flex justify-end items-center gap-2">
          {category.top_3_coins.map((coin, idx) => (
            <Image
              key={idx}
              src={coin}
              width={22}
              height={22}
              alt="coin"
              className="rounded-full"
            />
          ))}
        </div>
      ),
    },
    {
      header: "24h Change",
      headClassName: "text-right",
      cellClassName: "text-right font-medium",
      cell: (category) => {
        const isUp = category.market_cap_change_24h >= 0;
        return (
          <span className={isUp ? "text-green-500" : "text-red-500"}>
            {category.market_cap_change_24h.toFixed(2)}%
          </span>
        );
      },
    },
    {
      header: "Market Cap",
      headClassName: "text-right hidden md:table-cell",
      cellClassName: "text-right hidden md:table-cell font-medium tabular-nums",
      cell: (category) => formatCurrency(category.market_cap),
    },
    {
      header: "24h Volume",
      headClassName: "text-right hidden md:table-cell",
      cellClassName: "text-right hidden md:table-cell font-medium tabular-nums",
      cell: (category) => formatCurrency(category.volume_24h),
    },
  ];

  return (
    <section className="content-card p-4">
      <p className="sub-heading mb-3">Top Categories</p>

      <DataTable
        columns={columns}
        data={sortedCategories.slice(0, 10)}
        rowKey={(category) => category.name}
      />
    </section>
  );
};

export default Categories;
