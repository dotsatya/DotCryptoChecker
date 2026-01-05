import { Skeleton } from "@/components/ui/skeleton";

export function CoinDetailsFallback() {
  return (
    <section id="coin-detail" className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Coin Info Component */}
            <div className="content-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Live Price Display */}
              <div className="mb-4">
                <Skeleton className="h-8 w-40 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="content-card p-4 text-center">
                  <Skeleton className="h-4 w-12 mx-auto mb-1" />
                  <Skeleton className="h-6 w-16 mx-auto" />
                </div>
                <div className="content-card p-4 text-center">
                  <Skeleton className="h-4 w-12 mx-auto mb-1" />
                  <Skeleton className="h-6 w-16 mx-auto" />
                </div>
                <div className="content-card p-4 text-center">
                  <Skeleton className="h-4 w-20 mx-auto mb-1" />
                  <Skeleton className="h-6 w-12 mx-auto" />
                </div>
              </div>
            </div>

            {/* Trend Overview Component */}
            <div className="content-card p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-80 w-full rounded" />
            </div>

            {/* Market Data */}
            <div className="content-card p-6">
              <Skeleton className="h-6 w-32 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="content-card p-4 text-center">
                  <Skeleton className="w-8 h-8 rounded-full mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto mb-1" />
                  <Skeleton className="h-5 w-20 mx-auto" />
                </div>
                <div className="content-card p-4 text-center">
                  <Skeleton className="w-8 h-8 rounded-full mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto mb-1" />
                  <Skeleton className="h-5 w-20 mx-auto" />
                </div>
                <div className="content-card p-4 text-center">
                  <Skeleton className="w-8 h-8 rounded-full mx-auto mb-2" />
                  <Skeleton className="h-4 w-16 mx-auto mb-1" />
                  <Skeleton className="h-5 w-20 mx-auto" />
                </div>
              </div>

              {/* Links Section */}
              <div className="mt-8 pt-6 border-t">
                <Skeleton className="h-5 w-16 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="content-card p-4 text-center">
                    <Skeleton className="w-8 h-8 rounded-full mx-auto mb-2" />
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </div>
                  <div className="content-card p-4 text-center">
                    <Skeleton className="w-8 h-8 rounded-full mx-auto mb-2" />
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </div>
                  <div className="content-card p-4 text-center">
                    <Skeleton className="w-8 h-8 rounded-full mx-auto mb-2" />
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Additional Components */}
          <div className="lg:col-span-1 space-y-8">
            {/* Currency Converter */}
            <div className="content-card p-6">
              <Skeleton className="h-5 w-24 mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-4 w-8 mb-2" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>

            {/* Similar Coins */}
            <div className="content-card p-6">
              <Skeleton className="h-5 w-24 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Book */}
            <div className="content-card p-6">
              <Skeleton className="h-5 w-20 mb-4" />
              <div className="grid grid-cols-3 gap-2 mb-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 p-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Trades */}
            <div className="content-card p-6">
              <Skeleton className="h-5 w-24 mb-4" />
              <div className="grid grid-cols-3 gap-2 mb-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 p-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <div className="content-card p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
