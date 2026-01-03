import { fetcher } from "@/lib/api.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

const CoinOverview = async () => {
  // let coin;

  // try {
  //   coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
  //     dex_pair_format: "symbol",
  //   });
  // } catch (error) {
  //   console.error('Error fetching coin overview:', error);
  //   return <CoinOverviewFallback />;
  // }
  
  const coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
    dex_pair_format: "symbol",
  });


  
  return (
    <div
      id="coin-overview"
      className="content-card  flex  gap-3 p-2 rounded-2xl"
    >
      <Image src={coin.image.large} alt={coin.name} width={50} height={50} />
      <div>
        <p className="font-medium text-base text-stone-500 dark:text-stone-400">
          {coin.name} / BTC
        </p>
        <h1 className="text-xl font-semibold">
          {formatCurrency(coin.market_data.current_price.usd)}
        </h1>
      </div>
    </div>
  );
};

export default CoinOverview;
