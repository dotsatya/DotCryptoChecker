"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  UTCTimestamp,
  ColorType,
} from "lightweight-charts";

type OHLCData = [number, number, number, number, number];

interface Props {
  data: OHLCData[];
}

export default function CandleStickChartClient({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = createChart(ref.current, {
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#9ca3af",
      },
    });

    const series = chart.addSeries(CandlestickSeries);

    series.setData(
      data.map(([time, open, high, low, close]) => ({
        time: (Math.floor(time / 1000) as UTCTimestamp),
        open,
        high,
        low,
        close,
      }))
    );

    return () => chart.remove();
  }, [data]);

  return <div ref={ref} className="w-full h-[300px]" />;
}
