import { useEffect, useRef, useState } from "react";

const WS_BASE = process.env.NEXT_PUBLIC_DOTCRYPTO_WS_URL as string;

export const useCoinGecoWebSocket = ({
  coinId,
  poolId,
  liveInterval,
}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
  const wsRef = useRef<WebSocket | null>(null);
  const subscribeRef = useRef<Set<string>>(new Set());

  const [price, setPrice] = useState<ExtendedPriceData | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [ohlcv, setOHLCV] = useState<OHLCData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWebSocket = () => {
    if (wsRef.current) return;

    wsRef.current = new WebSocket(WS_BASE);

    wsRef.current.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connected");

      // Subscribe to coin
      if (coinId) {
        const subscribeMessage = {
          type: "subscribe",
          channels: [
            {
              name: "ticker",
              symbols: [coinId.toUpperCase()],
            },
          ],
        };
        wsRef.current?.send(JSON.stringify(subscribeMessage));
      }
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);

        if (data.type === "ticker" && data.symbol?.toLowerCase() === coinId.toLowerCase()) {
          const newPrice: ExtendedPriceData = {
            usd: data.price || 0,
            coin: coinId,
            price: data.price || 0,
            change24h: data.price_change_percentage_24h || 0,
            marketCap: data.market_cap || 0,
            volume24h: data.volume_24h || 0,
            timestamp: data.timestamp || Date.now(),
          };
          setPrice(newPrice);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    wsRef.current.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket disconnected");
      // Reconnect after delay
      setTimeout(connectWebSocket, 5000);
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
  };

  useEffect(() => {
    if (coinId) {
      connectWebSocket();
    }

    return () => {
      disconnectWebSocket();
    };
  }, [coinId]);

  return {
    price,
    trades,
    ohlcv,
    isConnected,
  };
};
