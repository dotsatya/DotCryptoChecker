"use client";

import { useCoinGecoWebSocket } from "@/hooks/useCoinGecoWebSocket";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LivePriceDisplayProps {
  coinId: string;
  initialPrice: number;
  initialChange24h: number;
}

const LivePriceDisplay = ({
  coinId,
  initialPrice,
  initialChange24h,
}: LivePriceDisplayProps) => {
  const { price, isConnected } = useCoinGecoWebSocket({
    coinId,
    poolId: "",
  });

  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [currentChange, setCurrentChange] = useState(initialChange24h);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (price?.usd !== undefined) {
      setCurrentPrice(price.usd);
    }
    if (price?.change24h !== undefined) {
      setCurrentChange(price.change24h);
    }
  }, [price]);

  const isPositive = currentChange > 0;

  return (
    <div className="space-y-3">
      {/* Mobile: Price and Change side by side, Desktop: All three in a row */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">Live Price</p>
          <p className="text-xl sm:text-2xl font-bold">
            {formatCurrency(currentPrice)}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">24h Change</p>
          <p
            className={`text-base sm:text-lg font-semibold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive && "+"}
            {formatPercentage(currentChange)}
          </p>
        </div>
        {/* Hide connection status on mobile, show on desktop */}
        <div className="hidden sm:flex items-center gap-2 justify-end">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-xs text-gray-500">
            {isConnected ? "Live" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* Connection status on mobile - separate row */}
      <div className="flex sm:hidden items-center gap-2 justify-center">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-xs text-gray-500">
          {isConnected ? "Live" : "Disconnected"}
        </span>
      </div>
    </div>
  );
};

export default LivePriceDisplay;
