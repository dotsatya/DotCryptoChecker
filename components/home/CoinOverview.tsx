import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import CandleStickChart from "../CandleStickChart";
import CoinOverviewFallback from "../CoinOverviewFallback";

const CoinOverview = async () => {
  let coin: CoinDetailsData | null = null;
  let coinOHLCData: OHLCData[] = [];

  try {
    // Add timeout wrapper for Vercel deployment
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 8000)
    );

    const fetchPromise = Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin", {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      }),
      fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 7,
      }).catch(() => []), // OHLC might fail, provide empty array as fallback
    ]);

    [coin, coinOHLCData] = await Promise.race([fetchPromise, timeoutPromise]) as [CoinDetailsData, OHLCData[]];
  } catch (error) {
    console.warn("CoinOverview: API fetch failed, using fallback:", error);
    return <CoinOverviewFallback />;
  }

  // Additional safety check
  if (!coin || !coin.market_data) {
    console.warn("CoinOverview: Invalid coin data received");
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
