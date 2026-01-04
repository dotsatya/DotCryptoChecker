import Image from "next/image";
import Link from "next/link";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { fetcher } from "@/lib/api.actions";
import DataTable from "@/components/DataTable";
import CoinsPagination from "@/components/CoinsPagination";

const Coins = async ({ searchParams }: NextPageProps) => {
  const params = await searchParams;
  const currentPage = parseInt(params.page as string) || 1;
  const itemsPerPage = 10;

  let coinsData: CoinMarketData[] = [];

  try {
    coinsData = await fetcher<CoinMarketData[]>(
      "/coins/markets",
      {
        vs_currency: "usd",
        order: "market_cap_desc",
        sparkline: false,
        price_change_percentage: "24h",
      },
      300
    );
  } catch (error) {
    console.error("Coins fetch failed:", error);
  }

  // Calculate pagination
  const totalItems = coinsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = coinsData.slice(startIndex, endIndex);

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View coin" />
        </>
      ),
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => (
        <div className="token-info">
          <Image
            src={coin.image}
            alt={coin.name}
            width={36}
            height={36}
            className="img-rounded"
          />
          <div className="min-w-0">
            <p className="token-name">{coin.name}</p>
            <p className="token-symbol">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      headClassName: "text-right",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
      header: "24h Change",
      headClassName: "text-right",
      cellClassName: "change-cell",
      cell: (coin) => {
        const isTrendingUp = coin.price_change_percentage_24h > 0;

        return (
          <span
            className={cn("change-value", {
              "trend-up": isTrendingUp,
              "trend-down": !isTrendingUp,
            })}
          >
            {isTrendingUp && "+"}
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        );
      },
    },
    {
      header: "Market Cap",
      headClassName: "text-right",
      cellClassName: "market-cap-cell",
      cell: (coin) => formatCurrency(coin.market_cap),
    },
  ];

  return (
    <section id="coins">
      <p className="sub-heading mb-3">Trending Coins</p>
      <div className="content-card">
        <DataTable
          tableClassName="table-default"
          columns={columns}
          data={paginatedData}
          rowKey={(coin) => coin.id}
        />
      </div>
      <CoinsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
      />
    </section>
  );
};

export default Coins;
