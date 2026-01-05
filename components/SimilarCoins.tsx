"use client";

import { useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetcher } from "@/lib/api.actions";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface SimilarCoinsProps {
  coinId: string;
  marketCapRank?: number;
}

interface SimilarCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
}

const SimilarCoins = ({ coinId, marketCapRank }: SimilarCoinsProps) => {
  const [similarCoins, setSimilarCoins] = useState<SimilarCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarCoins = async () => {
      try {
        // If no market cap rank provided, try the similar endpoint first
        if (!marketCapRank) {
          try {
            const data = await fetcher<{ coins: SimilarCoin[] }>(`/coins/${coinId}/similar`);
            if (data.coins && data.coins.length > 0) {
              setSimilarCoins(data.coins.slice(0, 5));
              return;
            }
          } catch (error) {
            // Silently fall back to market cap ranking - don't log expected API errors
          }
        }

        // Fallback: Fetch coins with similar market cap rankings
        const rank = marketCapRank || 1;
        const minRank = Math.max(1, rank - 5);
        const maxRank = rank + 5;

        const data = await fetcher<SimilarCoin[]>(
          "/coins/markets",
          {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20,
            page: Math.floor(minRank / 20) + 1,
            sparkline: false,
            price_change_percentage: "24h",
          },
          300
        );

        // Filter coins within the rank range and exclude the current coin
        const similarByRank = data
          .filter(coin =>
            coin.market_cap_rank >= minRank &&
            coin.market_cap_rank <= maxRank &&
            coin.id !== coinId
          )
          .slice(0, 5);

        setSimilarCoins(similarByRank);
      } catch (error) {
        // Only log unexpected errors, not rate limits or API errors
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (!errorMessage.includes('Too Many Requests') &&
            !errorMessage.includes('Rate limited') &&
            !errorMessage.includes('Invalid request') &&
            !errorMessage.includes('Data not found') &&
            !errorMessage.includes('Request error')) {
          console.error("Failed to fetch similar coins:", error);
        }
        setSimilarCoins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarCoins();
  }, [coinId, marketCapRank]);

  if (loading) {
    return <div className="text-sm text-gray-600 dark:text-gray-400">Loading similar coins...</div>;
  }

  if (similarCoins.length === 0) {
    return <div className="text-sm text-gray-600 dark:text-gray-400">No similar coins found</div>;
  }

  return (
    <div className="space-y-3">
      {similarCoins.map((coin) => (
        <Link
          key={coin.id}
          href={`/coins/${coin.id}`}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Image
              src={coin.image}
              alt={coin.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-sm">{coin.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                {coin.symbol}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {formatCurrency(coin.current_price)}
            </p>
            <p className={`text-xs ${coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(coin.price_change_percentage_24h)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default memo(SimilarCoins);
