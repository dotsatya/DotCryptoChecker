"use client";

import { useState, useEffect, memo } from "react";
import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";

interface RecentTradesProps {
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

const RecentTrades = ({ coinId }: RecentTradesProps) => {
  const [recentTrades, setRecentTrades] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentTrades = async () => {
      try {
        const data = await fetcher<CoinTickersResponse>(`/coins/${coinId}/tickers`, {
          include_exchange_logo: false,
          page: 1,
          depth: true,
          order: "trust_score_desc",
        });

        // Sort by timestamp (most recent first) and take top 10
        const sortedTrades = data.tickers
          .filter(ticker => ticker.timestamp)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10);

        setRecentTrades(sortedTrades);
      } catch (error) {
        console.error("Failed to fetch recent trades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTrades();
  }, [coinId]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (loading) {
    return <div className="text-sm text-gray-600 dark:text-gray-400">Loading recent trades...</div>;
  }

  if (recentTrades.length === 0) {
    return <div className="text-sm text-gray-600 dark:text-gray-400">No recent trades available</div>;
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
        <span>Exchange</span>
        <span>Price</span>
        <span>Time</span>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {recentTrades.map((trade, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-2 text-sm p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="truncate" title={trade.market.name}>
              {trade.market.name}
            </span>
            <span className="font-medium">
              {formatCurrency(trade.converted_last.usd)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(trade.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(RecentTrades);
