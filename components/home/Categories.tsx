import { fetcher } from "@/lib/api.actions";
import DataTable from "../DataTable";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

const Categories = async () => {
  let categories: Category[] = [];

  try {
    categories = await fetcher<Category[]>(
      "/coins/categories",
      undefined,
      600
    );
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  if (!categories.length) {
    return (
      <section className="content-card error-text">
        Failed to load categories.
      </section>
    );
  }

  const sortedCategories = [...categories].sort(
    (a, b) => b.market_cap - a.market_cap
  );

  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      headClassName: "table-text-left",
      cellClassName: "table-text-left table-cell-strong",
      cell: (category) => (
        <span className="category-name">{category.name}</span>
      ),
    },
    {
      header: "Top Gainers",
      headClassName: "text-right table-hidden-lg",
      cellClassName: "text-right table-hidden-lg",
      cell: (category) => (
        <div className="category-coins">
          {category.top_3_coins.map((coin, idx) => (
            <Image
              key={idx}
              src={coin}
              width={22}
              height={22}
              alt="coin"
              className="category-coin-img"
            />
          ))}
        </div>
      ),
    },
    {
      header: "24h Change",
      headClassName: "text-right",
      cellClassName: "text-right table-cell-medium",
      cell: (category) => {
        const isUp = category.market_cap_change_24h >= 0;

        return (
          <span className={`trend ${isUp ? "trend-up" : "trend-down"}`}>
            {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {category.market_cap_change_24h.toFixed(2)}%
          </span>
        );
      },
    },
    {
      header: "Market Cap",
      headClassName: "text-right table-hidden-md",
      cellClassName:
        "text-right table-hidden-md table-cell-medium table-numbers",
      cell: (category) => formatCurrency(category.market_cap),
    },
    {
      header: "24h Volume",
      headClassName: "text-right table-hidden-md",
      cellClassName:
        "text-right table-hidden-md table-cell-medium table-numbers",
      cell: (category) => formatCurrency(category.volume_24h),
    },
  ];

  return (
    <section className="content-card">
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
