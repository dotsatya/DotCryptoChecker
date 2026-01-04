import Categories from "@/components/home/Categories";
import CoinOverview from "@/components/home/CoinOverview";
import TrandingCoins from "@/components/home/TrandingCoins";
import { CategoriesFallback, CoinOverviewFallback, TrendingCoinsFallback } from "@/components/fallback";
import { Suspense } from "react";

const page = () => {
  return (
    <main>
      {/* Coin Overview */}
      <section className="flex flex-col lg:flex-row sm:px-6 gap-6">
        <div className="w-full lg:w-[60%] sm:pt-6">
          <Suspense fallback={<CoinOverviewFallback />}>
            <CoinOverview />
          </Suspense>
        </div>

        {/* Trending Coins */}
        <div className="w-full lg:w-[40%] sm:pt-6">
          <Suspense fallback={<TrendingCoinsFallback />}>
            <TrandingCoins />
          </Suspense>
        </div>
      </section>

      <section className="pt-6 sm:p-6">
        <div className="w-full ">
          <Suspense fallback={<CategoriesFallback />}>
            <Categories />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default page;
