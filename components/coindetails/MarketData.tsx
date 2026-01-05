import { memo } from "react";
import { formatCurrency } from "@/lib/utils";

interface MarketDataProps {
  marketCap: string;
  volume24h: string;
  marketCapRank: number;
  homepage?: string;
  blockchainSite?: string;
  subredditUrl?: string;
}

const MarketData = ({
  marketCap,
  volume24h,
  marketCapRank,
  homepage,
  blockchainSite,
  subredditUrl
}: MarketDataProps) => {
  return (
    <div className="content-card p-6">
      <h2 className="text-xl font-semibold mb-6">Market Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="content-card p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 text-sm">💰</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap</p>
          <p className="text-lg font-semibold">
            {marketCap}
          </p>
        </div>
        <div className="content-card p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-sm">📈</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">24h Volume</p>
          <p className="text-lg font-semibold">
            {volume24h}
          </p>
        </div>
        <div className="content-card p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400 text-sm">🏆</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap Rank</p>
          <p className="text-lg font-semibold">#{marketCapRank}</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="content-card p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">🌐</span>
                </div>
              </div>
              <p className="text-sm font-medium text-blue-600 hover:underline">Website</p>
            </a>
          )}
          {blockchainSite && (
            <a
              href={blockchainSite}
              target="_blank"
              rel="noopener noreferrer"
              className="content-card p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 text-sm">🔍</span>
                </div>
              </div>
              <p className="text-sm font-medium text-blue-600 hover:underline">Explorer</p>
            </a>
          )}
          {subredditUrl && (
            <a
              href={subredditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="content-card p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-sm">👥</span>
                </div>
              </div>
              <p className="text-sm font-medium text-blue-600 hover:underline">Community</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MarketData);
