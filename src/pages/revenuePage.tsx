import Chart from "../features/chart/components/chart";
import StatsOverview from "../features/ledger/components/statcard";
import TransactionsList from "../features/transactions/components/transactionList";
import { useWallet } from "../shared/hooks/useWallet";

const Revenue = () => {
  const { data: wallet, isLoading, isError } = useWallet();

  return (
    <div className=" flex flex-col gap-[5.13rem]  ">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between">
        <div className=" flex flex-col h-full w-full lg:w-[65.97%]">
          {/* Top section */}
          <div className="flex items-center  gap-16 2xl:mb-10">
            {isError ? (
              <div>Error loading balance</div>
            ) : (
              <div>
                <p className="text-[#56616B] mb-1 font-medium text-sm leading-4">
                  Available Balance
                </p>
                <p className="text-[#131316] font-bold text-2xl leading-10 xl:text-3xl xl:leading-11 2xl:text-4xl 2xl:leading-12">
                  USD {isLoading ? "0.00" : wallet?.balance.toFixed(2)}
                </p>
              </div>
            )}
            <button className="2xl:px-[3.25rem] 2xl:py-3.5 py-2.5 px-8 bg-[#131316] hover:scale-105 rounded-full text-white text-sm xl:text-base font-semibold leading-6">
              Withdraw
            </button>
          </div>

          {/* Chart container fills remaining height */}
          <div className="flex-1 ">
            <Chart />
          </div>
        </div>
        <div className="w-full lg:w-[27%] xl:w-[25%] 2xl:w-[23.36%] ">
          <StatsOverview />
        </div>
      </div>
      <TransactionsList />
    </div>
  );
};

export default Revenue;
