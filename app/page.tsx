import Image from "next/image";
import React from "react";

const Page = () => {
  // CG-1jKCPxZn53q6ND5zvKaXzQtW
  // https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin&x_cg_demo_api_key=CG-1jKCPxZn53q6ND5zvKaXzQtW

  // {
  //   "bitcoin": {
  //     "usd": 90163
  //   }
  // }

  return (
    <main className="p-6">
      <section className="flex">
        <div
          id="coin-overview"
          className="bg-black/5 dark:bg-white/5 p-3 flex flex-col rounded-2xl"
        >
          <div className=" flex flex-row gap-3 p-1">
            <Image
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              alt="Bitcoin"
              width={50}
              height={50}
            />
            <div>
              <p className=" font-sans font-medium text-base text-stone-500 dark:text-stone-400">
                Bitcoin / BTC
              </p>
              <h1 className="text-xl font-bold">$90163.00</h1>
            </div>
          </div>
          <div>DotCrypto</div>
        </div>
        <div>DotCryptoCheckere</div>
      </section>
      <section>CryptoChecker</section>
    </main>
  );
};

export default Page;
