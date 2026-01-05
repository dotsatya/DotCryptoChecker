"use client";

import { useState, useEffect, memo } from "react";
import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface CurrencyConverterProps {
  coinId: string;
  coinSymbol: string;
  coinPrice: number;
  allPrices?: Record<string, number>; // All currency prices from coin data
}

// Currency symbol mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  usd: "$",
  eur: "€",
  gbp: "£",
  jpy: "¥",
  inr: "₹",
  btc: "₿",
  eth: "Ξ",
  bnb: "BNB",
  xrp: "XRP",
  ada: "ADA",
  sol: "SOL",
  dot: "DOT",
  matic: "MATIC",
  avax: "AVAX",
};

const CurrencyConverter = ({ coinId, coinSymbol, coinPrice, allPrices }: CurrencyConverterProps) => {
  const [targetCurrency, setTargetCurrency] = useState<string>("usd");
  const [coinAmount, setCoinAmount] = useState<string>("1");
  const [targetAmount, setTargetAmount] = useState<string>("");

  // Use provided prices or fallback to basic USD conversion
  const exchangeRates = allPrices || { usd: coinPrice };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (exchangeRates[targetCurrency]) {
      const amount = parseFloat(coinAmount) || 0;
      const converted = amount * exchangeRates[targetCurrency];
      setTargetAmount(converted.toFixed(6));
    }
  }, [coinAmount, exchangeRates, targetCurrency]);

  const handleCoinChange = (value: string) => {
    setCoinAmount(value);
  };

  const handleTargetChange = (value: string) => {
    setTargetAmount(value);
    if (exchangeRates[targetCurrency] && coinPrice) {
      const amount = parseFloat(value) || 0;
      const targetRate = exchangeRates[targetCurrency];
      const converted = (amount * coinPrice) / targetRate;
      setCoinAmount(converted.toString());
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setTargetCurrency(currency);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium uppercase">{coinSymbol}</span>
        <Input
          type="number"
          value={coinAmount}
          onChange={(e) => handleCoinChange(e.target.value)}
          placeholder="0"
          className="text-right flex-1"
        />
      </div>

      <div className="text-center text-gray-500 dark:text-gray-400">≈</div>

      <div className="flex items-center gap-2">
        <select
          value={targetCurrency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          aria-label="Select target currency"
          className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 min-w-0 flex-shrink-0"
        >
          {Object.keys(exchangeRates)
            .filter((currencyCode, index, arr) => arr.indexOf(currencyCode) === index) // Remove duplicates
            .sort() // Sort alphabetically for better UX
            .map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {CURRENCY_SYMBOLS[currencyCode] || ""} {currencyCode.toUpperCase()}
              </option>
            ))}
        </select>
        <Input
          type="number"
          value={targetAmount}
          onChange={(e) => handleTargetChange(e.target.value)}
          placeholder="0"
          className="text-right flex-1"
        />
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        1 {coinSymbol.toUpperCase()} = {exchangeRates[targetCurrency] ? (exchangeRates[targetCurrency] / coinPrice).toFixed(6) : "N/A"} {CURRENCY_SYMBOLS[targetCurrency] || targetCurrency.toUpperCase()}
      </div>
    </div>
  );
};

export default memo(CurrencyConverter);
