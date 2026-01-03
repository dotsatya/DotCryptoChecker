import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import DataTable from "../DataTable";
import { TrendingDown, TrendingUp } from "lucide-react";

const columns = [
  {
    header: "Coin",
    headClassName: "text-left",
    cell: (coin: TrendingCoin) => (
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-6 h-6 shrink-0">
          <Image
            src={coin.item.thumb}
            alt={coin.item.name}
            fill
            className="object-contain rounded-full"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-medium truncate">
            {coin.item.name}
          </span>
          <span className="text-xs uppercase text-stone-500 dark:text-stone-400">
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
          className={`flex items-center justify-end gap-1 font-medium ${
            isUp ? "text-green-500" : "text-red-500"
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
    cellClassName: "text-right font-semibold",
    cell: (coin: TrendingCoin) => (
      <span className="font-semibold ">
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
    <section className="content-card p-4">
      <p className="sub-heading mb-3">Trending Coins</p>

      <DataTable
        data={trendingCoins.coins.slice(0, 6)}
        columns={columns}
        rowKey={(coin) => coin.item.id}
      />
    </section>
  );
};


export default TrandingCoins;
