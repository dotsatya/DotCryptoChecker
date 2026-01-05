"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetcher } from "@/lib/api.actions";
import { useMultipleCoinsWebSocket } from "@/hooks/useMultipleCoinsWebSocket";

/* ================= TYPES ================= */
interface CoinMarketData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

/* ================= CONSTANT ================= */
const REFRESH_INTERVAL = 30000; // 30 seconds

const SearchBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /* ================= FETCH COINS (same as All Coins) ================= */
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const data = await fetcher<CoinMarketData[]>(
          "/coins/markets",
          {
            vs_currency: "usd",
            order: "market_cap_desc",
            sparkline: false,
            price_change_percentage: "24h",
          },
          300
        );
        setCoins(data || []);
      } catch (error) {
        console.error("Coins fetch failed:", error);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  /* ================= WEBSOCKET FOR REALTIME PRICES ================= */
  const filteredCoinIds = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    return coins
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(q) ||
          coin.symbol.toLowerCase().includes(q)
      )
      .slice(0, 10)
      .map((coin) => coin.id);
  }, [query, coins]);

  const { priceUpdates } = useMultipleCoinsWebSocket({
    coinIds: filteredCoinIds,
  });

  /* ================= MERGE REALTIME DATA ================= */
  const coinsWithRealtimeData = useMemo(() => {
    return coins.map((coin) => {
      const update = priceUpdates[coin.id];
      if (update) {
        return {
          ...coin,
          current_price: update.current_price,
          price_change_percentage_24h: update.price_change_percentage_24h,
        };
      }
      return coin;
    });
  }, [coins, priceUpdates]);

  /* ================= FILTER ================= */
  const filteredCoins = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    return coinsWithRealtimeData
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(q) ||
          coin.symbol.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [query, coinsWithRealtimeData]);

  /* ================= CMD + K ================= */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (id: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/coins/${id}`);
  };

  return (
    <>
      {/* ================= SEARCH BUTTON ================= */}
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="
          relative h-9 w-46 md:w-56 lg:w-64 
          justify-start gap-2
          rounded-xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-black/60
          backdrop-blur-xl
          text-sm text-muted-foreground
        "
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline-flex">Search coins...</span>
        <span className="lg:hidden">Search...</span>

        <kbd className="pointer-events-none absolute right-2 top-1.5 hidden sm:flex h-6 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* ================= COMMAND DIALOG ================= */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="
          bg-white dark:bg-[#0b0b0b]
          border-2 border-black/10 dark:border-white/10
          shadow-2xl
        "
      >
        <CommandInput
          placeholder="Search coins by name or symbol..."
          value={query}
          onValueChange={setQuery}
          className="h-12 text-base"
        />

        <CommandList className="max-h-[420px] ">
          <CommandEmpty className="py-10 text-center text-sm text-muted-foreground">
            {loading
              ? "Updating prices..."
              : query.length === 0
              ? "Start typing to search coins"
              : "No coins found"}
          </CommandEmpty>

          {filteredCoins.length > 0 && (
            <CommandGroup heading="Coins">
              {filteredCoins.map((coin) => {
                const isUp = (coin.price_change_percentage_24h ?? 0) >= 0;

                return (
                  <CommandItem
                    key={coin.id}
                    value={coin.id}
                    onSelect={() => handleSelect(coin.id)}
                    className="
                      flex items-center justify-between
                      rounded-lg px-3 py-2
                      hover:bg-blue-500/10
                    "
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3 min-w-0">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />

                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">
                          {coin.name}
                        </span>
                        <span className="text-xs uppercase text-muted-foreground">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-end text-right shrink-0">
                      <span className="text-sm font-semibold tabular-nums">
                        ${coin.current_price?.toLocaleString() ?? "0.00"}
                      </span>

                      <span
                        className={`flex items-center gap-1 text-xs font-medium ${
                          isUp ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {isUp ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {coin.price_change_percentage_24h?.toFixed(2) ?? "0.00"}
                        %
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
