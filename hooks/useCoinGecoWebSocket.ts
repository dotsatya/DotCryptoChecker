import { useEffect, useRef, useState } from "react";
// "wss://ws.coincap.io/trades/";
const WS_BASE = `${process.env.NEXT_PUBLIC_DOTCRYPTO_WS_URL}?x_cg_pro_api_key=${process.env.NEXT_PUBLIC_DOTCRYPTO_API_KEY}`;

export const useCoinGecoWebSocket = ({
  coinId,
  poolId,
  liveInterval,
}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
  const wsRef = useRef<WebSocket | null>(null);
  const subscribe = useRef(<Set<string>>new Set());

  const [price, setPrice] = useState<ExtendedPriceData | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [ohlcv, setOHLCV] = useState<OHLCData | null>(null);

  const [isWsReady, setIsWsReady] = useState(false);

  useEffect(() => {}, []);
};
