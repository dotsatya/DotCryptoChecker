import { memo } from "react";

interface PerformanceMetricsProps {
  todayChange: string;
  thirtyDayChange: string;
  marketCapRank: number;
}

const PerformanceMetrics = ({
  todayChange,
  thirtyDayChange,
  marketCapRank
}: PerformanceMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className=" p-2 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Today</p>
        <p className={`text-xl font-semibold ${todayChange.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
          {todayChange}
        </p>
      </div>
      <div className=" p-2 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">30 Days</p>
        <p className={`text-xl font-semibold ${thirtyDayChange.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
          {thirtyDayChange}
        </p>
      </div>
      <div className=" p-2 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap Rank</p>
        <p className="text-xl font-semibold">#{marketCapRank}</p>
      </div>
    </div>
  );
};

export default memo(PerformanceMetrics);
