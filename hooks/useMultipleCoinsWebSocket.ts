import { useEffect, useRef, useState } from "react";

const WS_BASE = process.env.NEXT_PUBLIC_DOTCRYPTO_WS_URL as string;

interface UseMultipleCoinsWebSocketProps {
  coinIds: string[];
}

interface CoinPriceUpdate {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export const useMultipleCoinsWebSocket = ({
  coinIds,
}: UseMultipleCoinsWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [priceUpdates, setPriceUpdates] = useState<Record<string, CoinPriceUpdate>>({});
  const [isConnected, setIsConnected] = useState(false);

  const connectWebSocket = () => {
    if (wsRef.current || coinIds.length === 0) return;

    wsRef.current = new WebSocket(WS_BASE);

    wsRef.current.onopen = () => {
      setIsConnected(true);

      // Subscribe to multiple coins
      const subscribeMessage = {
        type: "subscribe",
        channels: [
          {
            name: "ticker",
            symbols: coinIds.map(id => id.toUpperCase()),
          },
        ],
      };
      wsRef.current?.send(JSON.stringify(subscribeMessage));
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);

        if (data.type === "ticker" && data.symbol) {
          const coinId = data.symbol.toLowerCase();
          setPriceUpdates(prev => ({
            ...prev,
            [coinId]: {
              id: coinId,
              current_price: data.price || 0,
              price_change_percentage_24h: data.price_change_percentage_24h || 0,
            },
          }));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    wsRef.current.onclose = (event) => {
      setIsConnected(false);
      // Reconnect after delay if not a normal closure
      if (event.code !== 1000) {
        setTimeout(connectWebSocket, 5000);
      }
    };

    wsRef.current.onerror = (error) => {
      console.warn("WebSocket connection error occurred");
      setIsConnected(false);
      // Don't log the error object as it might be empty
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
    if (coinIds.length > 0) {
      connectWebSocket();
    }

    return () => {
      disconnectWebSocket();
    };
  }, [coinIds.length]); // Reconnect when coinIds change

  return {
    priceUpdates,
    isConnected,
  };
};
