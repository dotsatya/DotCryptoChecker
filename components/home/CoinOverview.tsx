import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import CandleStickChart from "../CandleStickChart";
import CandleStickChartClient from "../CandleStickChartClient";

const CoinOverview = async () => {
  // let coin;

  // try {
  //   coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
  //     dex_pair_format: "symbol",
  //   });
  // } catch (error) {
  //   console.error('Error fetching coin overview:', error);
  //   return <CoinOverviewFallback />;
  // }

  // const coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
  //   dex_pair_format: "symbol",
  // });

  const [coin, coinOHLCData] = await Promise.all([
    await fetcher<CoinDetailsData>("/coins/bitcoin", {
      dex_pair_format: "symbol",
    }),
    await fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
      vs_currency: "usd",
      days: 7,
      // interval: "hourly",
      // precision: "full",
    }),
  ]);

  return (
    <>
      <div id="coin-overview" className="content-card rounded-2xl">
        <CandleStickChart data={coinOHLCData} coinId="bitcoin">
          <div className=" flex  gap-3  ">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={50}
              height={50}
            />
            <div>
              <p className="font-medium text-base text-stone-500 dark:text-stone-400">
                {coin.name} / BTC
              </p>
              <h1 className="text-xl font-semibold">
                {formatCurrency(coin.market_data.current_price.usd)}
              </h1>
            </div>
          </div>
        </CandleStickChart>
      </div>
    </>
  );
};

export default CoinOverview;
