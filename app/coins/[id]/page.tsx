"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetcher } from "@/lib/api.actions";
import { formatCurrency, formatPercentage, convertOHLCData } from "@/lib/utils";
import CandleStickChart from "@/components/CandleStickChart";
import LivePriceDisplay from "@/components/LivePriceDisplay";
import CurrencyConverter from "@/components/CurrencyConverter";
import SimilarCoins from "@/components/SimilarCoins";
import OrderBook from "@/components/OrderBook";
import RecentTrades from "@/components/RecentTrades";
import MarketData from "@/components/coindetails/MarketData";
import PerformanceMetrics from "@/components/coindetails/PerformanceMetrics";
import { CoinDetailsFallback } from "@/components/coindetails/CoinDetailsFallback";
import { useEffect, useState, useMemo, useCallback } from "react";

interface CoinDetailPageProps {
  params: Promise<{ id: string }>;
}

const CoinDetailPage = ({ params }: CoinDetailPageProps) => {
  const [id, setId] = useState<string>("");
  const [coinData, setCoinData] = useState<CoinDetailsData | null>(null);
  const [coinOHLCData, setCoinOHLCData] = useState<OHLCData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const resolvedParams = await params;
      setId(resolvedParams.id);

      const [coin, ohlc] = await Promise.all([
        fetcher<CoinDetailsData>(`/coins/${resolvedParams.id}`, {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        }),
        fetcher<OHLCData[]>(`/coins/${resolvedParams.id}/ohlc`, {
          vs_currency: "usd",
          days: 30,
        }).catch(() => []),
      ]);

      setCoinData(coin);
      setCoinOHLCData(ohlc);
    } catch (error) {
      notFound();
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized computed values to prevent unnecessary recalculations
  const marketData = useMemo(() => {
    if (!coinData) return null;
    return {
      marketCap: formatCurrency(coinData.market_data.market_cap.usd),
      volume24h: formatCurrency(coinData.market_data.total_volume.usd),
      priceChange24h: formatPercentage(coinData.market_data.price_change_percentage_24h_in_currency.usd),
      priceChange30d: formatPercentage(coinData.market_data.price_change_percentage_30d_in_currency?.usd || 0),
    };
  }, [coinData]);

  if (loading || !coinData) {
    return <CoinDetailsFallback />;
  }

  return (
    <section id="coin-detail" className="py-8">
      <div className="container mx-auto">
        <div className="mb-6">
          <Link
            href="/coins"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            ← Back to Coins
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Coin Info Component */}
            <div className="content-card p-4 sm:p-6">
              <div className="flex flex-row items-start sm:items-center gap-4 mb-6">
                <Image
                  src={coinData.image.large}
                  alt={coinData.name}
                  width={48}
                  height={48}
                  className="rounded-full sm:w-16 sm:h-16"
                />
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold truncate">{coinData.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 uppercase text-sm sm:text-base">
                    {coinData.symbol}
                  </p>
                </div>
              </div>

              <div className="space-y-4 px-2">
                <LivePriceDisplay
                  coinId={id}
                  initialPrice={coinData.market_data.current_price.usd}
                  initialChange24h={coinData.market_data.price_change_percentage_24h_in_currency.usd}
                />
              </div>
            </div>

            {/* Trend Overview Component */}
            <div className="content-card p-6">
              <h2 className="text-xl font-semibold mb-4">Trend Overview</h2>
              <CandleStickChart
                coinId={id}
                data={coinOHLCData}
                initialPeriod="monthly"
                height={400}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={coinData.image.small}
                    alt={coinData.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{coinData.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(coinData.market_data.current_price.usd)}
                    </p>
                  </div>
                </div>
              </CandleStickChart>
            </div>

            {/* Market Data Component */}
            <MarketData
              marketCap={marketData?.marketCap || "N/A"}
              volume24h={marketData?.volume24h || "N/A"}
              marketCapRank={coinData.market_cap_rank}
              homepage={coinData.links.homepage[0]}
              blockchainSite={coinData.links.blockchain_site[0]}
              subredditUrl={coinData.links.subreddit_url}
            />
          </div>

          {/* Right Side - Additional Components */}
          <div className="lg:col-span-1 space-y-8">
            {/* Currency Converter */}
            <div className="content-card p-6">
              <h3 className="text-lg font-semibold mb-4">{coinData.symbol.toUpperCase()} Converter</h3>
              <CurrencyConverter
                coinId={id}
                coinSymbol={coinData.symbol}
                coinPrice={coinData.market_data.current_price.usd}
                allPrices={coinData.market_data.current_price}
              />
            </div>

            {/* Similar Coins */}
            <div className="content-card p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Coins</h3>
              <SimilarCoins coinId={id} marketCapRank={coinData.market_cap_rank} />
            </div>

            {/* Order Book */}
            <div className="content-card p-6">
              <h3 className="text-lg font-semibold mb-4">Order Book</h3>
              <OrderBook coinId={id} />
            </div>

            {/* Recent Trades */}
            <div className="content-card p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
              <RecentTrades coinId={id} />
            </div>
          </div>
        </div>

        {/* Description */}
        {coinData.description.en && (
          <div className="mt-8">
            <div className="content-card p-6">
              <h2 className="text-xl font-semibold mb-4">About {coinData.name}</h2>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: coinData.description.en }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoinDetailPage;
