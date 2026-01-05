"use client";

import { useState, useEffect, memo } from "react";
import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";

interface OrderBookProps {
  coinId: string;
}

interface Ticker {
  market: {
    name: string;
  };
  base: string;
  target: string;
  converted_last: {
    usd: number;
  };
  timestamp: string;
  trade_url: string;
}

interface CoinTickersResponse {
  tickers: Ticker[];
}

const OrderBook = ({ coinId }: OrderBookProps) => {
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const data = await fetcher<CoinTickersResponse>(`/coins/${coinId}/tickers`, {
          include_exchange_logo: false,
          page: 1,
          depth: true,
          order: "trust_score_desc",
        });
        // Show top 10 tickers as simplified order book
        setTickers(data.tickers.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch tickers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickers();
  }, [coinId]);

  if (loading) {
    return <div className="text-sm text-gray-600 dark:text-gray-400">Loading order book...</div>;
  }

  if (tickers.length === 0) {
    return <div className="text-sm text-gray-600 dark:text-gray-400">No order book data available</div>;
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
        <span>Exchange</span>
        <span>Price</span>
        <span>Trade</span>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {tickers.map((ticker, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-2 text-sm p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="truncate" title={ticker.market.name}>
              {ticker.market.name}
            </span>
            <span className="font-medium">
              {formatCurrency(ticker.converted_last.usd)}
            </span>
            <a
              href={ticker.trade_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-xs"
            >
              Trade
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(OrderBook);
