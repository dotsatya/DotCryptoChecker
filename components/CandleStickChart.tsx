"use client";

import {
  getCandlestickConfig,
  getChartConfig,
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
} from "@/constants";
import { fetcher } from "@/lib/api.actions";
import { convertOHLCData } from "@/lib/utils";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

const CandleStickChart = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod,
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const isFetchingRef = useRef(false); // ✅ ADD THIS

  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<Period>(initialPeriod ?? "daily");
  const [OHLCData, setOHLCData] = useState<OHLCData[]>(data ?? []);

  const fatchOHLCData = async (selectedPeriod: Period) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const { days } = PERIOD_CONFIG[selectedPeriod];

      const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days,
      });

      setOHLCData(newData ?? []);
    } catch (error) {
      console.error("Error fetching OHLC data:", error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period || loading) return;

    setPeriod(newPeriod);
    fatchOHLCData(newPeriod);
  };

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const TIME_PERIODS: readonly Period[] = [
      "daily",
      "weekly",
      "monthly",
      "3months",
      "6months",
      "yearly",
    ];

    const showTime = TIME_PERIODS.includes(period);

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });

    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());
    series.setData(convertOHLCData(OHLCData));
    chart.timeScale().fitContent();

    chartRef.current = chart;
    candlestickSeriesRef.current = series;
    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({ width: entries[0].contentRect.width });
    });
    observer.observe(container);
    return () => {
      chart.remove();
      observer.disconnect();
      chartRef.current = null;
      candlestickSeriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!candlestickSeriesRef.current) return;
    const convertedToSeconds = OHLCData.map(
      (item) =>
        [
          Math.floor(item[0] / 1000),
          item[1],
          item[2],
          item[3],
          item[4],
        ] as OHLCData
    );
    const converted = convertOHLCData(convertedToSeconds);
    candlestickSeriesRef.current.setData(converted);
    chartRef.current?.timeScale().fitContent();
  }, [OHLCData]);

  return (
    <div
      id="candlestick-chart"
      className="
        w-full rounded-2xl"
    >
      {/* TOP BAR */}
      <div className="flex flex-col  sm:justify-between gap-4 mb-4">
        {/* LEFT INFO */}
        <div className="flex items-center gap-3">{children}</div>

        {/* PERIOD CONTROLS */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="pl-1 text-base font-medium text-gray-500 dark:text-gray-400">
            Period:
          </span>

          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handlePeriodChange(value)}
              disabled={loading}
              className={`
                px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg
                transition-all duration-200
                ${period === value ? "active" : "in-active"}
                ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CHART AREA (placeholder) */}
      <div
        style={{ height }}
        className="
          w-full rounded-xl
          bg-gray-50 dark:bg-black
          border border-gray-200 dark:border-gray-800
          flex items-center justify-center
          text-sm text-gray-400
        "
      >
        <div
          ref={chartContainerRef}
          className="w-full h-full"
          style={{ height }}
        />
      </div>
    </div>
  );
};

export default CandleStickChart;
