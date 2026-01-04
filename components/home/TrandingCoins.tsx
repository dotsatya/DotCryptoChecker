import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import DataTable from "../DataTable";
import { TrendingDown, TrendingUp } from "lucide-react";

const columns = [
  {
    header: "Coin",
    headClassName: "table-text-left",
    cell: (coin: TrendingCoin) => (
      <div className="flex-row-center gap-sm min-w-0">
        <div className="icon-wrap">
          <Image
            src={coin.item.thumb}
            alt={coin.item.name}
            fill
            className="img-contain"
          />
        </div>

        <div className="flex-col min-w-0">
          <span className="font-medium text-truncate">
            {coin.item.name}
          </span>
          <span className="text-xs-muted">
            {coin.item.symbol}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "24h Change",
    headClassName: "text-right",
    cellClassName: "text-right",
    cell: (coin: TrendingCoin) => {
      const change =
        coin.item.data.price_change_percentage_24h.usd;

      const isUp = change >= 0;

      return (
        <div
          className={`trend-right ${
            isUp ? "trend-up" : "trend-down"
          }`}
        >
          {isUp ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span>{change.toFixed(2)}%</span>
        </div>
      );
    },
  },
  {
    header: "Price",
    headClassName: "text-right",
    cellClassName: "text-right table-cell-strong",
    cell: (coin: TrendingCoin) => (
      <span className="table-cell-strong">
        {formatCurrency(coin.item.data.price)}
      </span>
    ),
  },
];

const TrandingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "/search/trending",
    undefined,
    300
  );

  return (
    <section className="content-card">
      <p className="sub-heading mb-3">Trending Coins</p>

      <DataTable
        data={trendingCoins.coins.slice(0, 7)}
        columns={columns}
        rowKey={(coin) => coin.item.id}
      />
    </section>
  );
};

export default TrandingCoins;
