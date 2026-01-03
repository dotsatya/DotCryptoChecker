import CoinOverview from "@/components/home/CoinOverview";
import TrandingCoins from "@/components/home/TrandingCoins";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const page = () => {
  return (
    <main className="flex flex-col lg:flex-row sm:px-6 gap-6">
      {/* Coin Overview */}
      <section className="w-full lg:w-1/2 sm:pt-6">
        <Suspense
          fallback={
            <div className="content-card p-4 space-y-4">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-36" />
                </div>
              </div>
            </div>
          }
        >
          <CoinOverview />
        </Suspense>
      </section>

      {/* Trending Coins */}
      <section className="w-full lg:w-1/2 sm:pt-6">
        <Suspense
          fallback={
            <div className="content-card p-4 space-y-4">
              <Skeleton className="h-4 w-40" />

              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 w-1/2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          }
        >
          <TrandingCoins />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
