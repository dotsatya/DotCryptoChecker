import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import CandleStickChart from "../CandleStickChart";
import CoinOverviewFallback from "../CoinOverviewFallback";

const CoinOverview = async () => {
  let coin: CoinDetailsData | null = null;
  let coinOHLCData: OHLCData[] = [];

  try {
    [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 7,
      }),
    ]);
  } catch (error) {
    console.error("Error fetching coin page data:", error);
    return <CoinOverviewFallback />;
  }

  return (
    <div id="coin-overview" className="content-card card-rounded">
      <CandleStickChart
        data={coinOHLCData}
        coinId="bitcoin"
        initialPeriod="weekly"
      >
        <div className="flex-row flex-gap-sm">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={50}
            height={50}
            className="img-rounded"
          />
          <div>
            <p className="text-muted">
              {coin.name} / BTC
            </p>
            <h1 className="text-title">
              {formatCurrency(coin.market_data.current_price.usd)}
            </h1>
          </div>
        </div>
      </CandleStickChart>
    </div>
  );
};

export default CoinOverview;
