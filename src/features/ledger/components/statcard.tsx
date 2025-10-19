import { Info } from "lucide-react";
import { useWallet } from "@/shared/hooks/useWallet";

interface StatCardProps {
  title: string;
  amount: string;
}

const StatCard = ({ title, amount }: StatCardProps) => {
  return (
    <div className="flex w-full flex-col  gap-2 ">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#56616B] text-sm font-medium leading-4">
          {title}
        </span>
        <Info className="w-4 h-4 text-[#888F95]" />
      </div>
      <p className="2xl:text-[1.75rem] text-xl leading-6 xl:text-2xl xl:leading-7 font-bold 2xl:leading-[2.38rem] text-[#131316] ">
        {amount}
      </p>
    </div>
  );
};

const StatsOverview = () => {
  const { data: wallet, isLoading } = useWallet();
  return (
    <div className="w-full mx-auto  flex flex-col gap-8 rounded-2xl  ">
      <StatCard
        title="Ledger Balance"
        amount={
          isLoading
            ? "USD 0.00"
            : `USD ${wallet?.ledger_balance?.toFixed(2) ?? "0.00"}`
        }
      />
      <StatCard
        title="Total Payout"
        amount={
          isLoading
            ? "USD 0.00"
            : `USD ${wallet?.total_payout?.toFixed(2) ?? "0.00"}`
        }
      />
      <StatCard
        title="Total Revenue"
        amount={
          isLoading
            ? "USD 0.00"
            : `USD ${wallet?.total_revenue?.toFixed(2) ?? "0.00"}`
        }
      />
      <StatCard
        title="Pending Payout"
        amount={
          isLoading
            ? "USD 0.00"
            : `USD ${wallet?.pending_payout?.toFixed(2) ?? "0.00"}`
        }
      />
    </div>
  );
};

export default StatsOverview;
