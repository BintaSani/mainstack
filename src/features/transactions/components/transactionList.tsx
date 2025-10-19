import {
  HiOutlineArrowDownLeft as ArrowDownLeft,
  HiOutlineArrowUpRight as ArrowUpRight,
} from "react-icons/hi2";
import { RxDownload } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { useTransactions } from "@/shared/hooks/useTransaction";
import { useFilter } from "@/shared/context/filterContext";
import EmptyState from "./emptyState";
import { format } from "date-fns";
import { generateTransactionsPDF } from "../utils/exportTransactions";

const TransactionsList = () => {
  const { appliedFilters: filters, openDrawer, appliedCount } = useFilter();
  const { data: transactions = [], isLoading, isError } = useTransactions();

  //filter transactions based on filters from context
  const filteredTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);

    const matchesType =
      filters.types.length === 0 ||
      filters.types.includes(t.metadata?.type || t.type);

    const matchesStatus =
      filters.statuses.length === 0 ||
      filters.statuses.includes(t.status.toLowerCase());

    const matchesDate =
      (!filters.startDate || tDate >= filters.startDate) &&
      (!filters.endDate || tDate <= filters.endDate);

    return matchesType && matchesStatus && matchesDate;
  });

  return (
    <div
      data-testid="transaction-list"
      className=" text-gray-200 flex flex-col gap-8   "
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between pb-6 border-b ">
        <div>
          <h2 className="xl:text-2xl text-xl leading-7 xl:leading-8 font-bold text-[#131316]">
            {filteredTransactions.length} Transactions
          </h2>
          <p className="text-sm font-medium leading-4 text-[#56616B]">
            {filters.startDate && filters.endDate
              ? `Transactions from ${new Date(
                  filters.startDate
                ).toLocaleDateString()} to ${new Date(
                  filters.endDate
                ).toLocaleDateString()}`
              : "Your transactions for the last 7 days"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={openDrawer}
            className="bg-[#EFF1F6] hover:scale-105 hover:bg-[#131316] hover:text-white text-sm xl:text-base font-semibold leading-6 px-5 py-2 md:py-3 text-[#131316] rounded-full flex items-center gap-1"
            data-testid="filter-button"
          >
            Filter
            {appliedCount > 0 && (
              <span className="ml-2 bg-[#131316] text-white rounded-full text-xs px-2 py-0.5">
                {appliedCount}
              </span>
            )}
            <IoIosArrowDown size={18} />
          </button>
          <button
            onClick={() => generateTransactionsPDF(filteredTransactions)}
            className="bg-[#EFF1F6] hover:scale-105 hover:bg-[#131316] hover:text-white text-sm xl:text-base font-semibold leading-6 text-[#131316] px-5 py-2 md:py-3 rounded-full flex items-center gap-2"
          >
            Export list
            <RxDownload size={18} />
          </button>
        </div>
      </div>

      {/* Transaction Items */}

      {!isLoading && !isError && filteredTransactions.length === 0 && (
        <EmptyState />
      )}
      {isLoading ? (
        <div className="flex w-full text-black h-40 items-center justify-center">
          <p>Loading transactions...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center text-red-400 w-full h-10 justify-center">
          <p>Error loading transactions.</p>
        </div>
      ) : (
        <ul className="space-y-5">
          {filteredTransactions.map((t, i) => (
            <li key={i} className="flex items-center justify-between  pb-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={`p-3.5 flex items-center justify-center rounded-full ${
                    t.type === "deposit" ? "bg-[#E3FCF2]" : "bg-[#F9E3E0]"
                  }`}
                >
                  {t.type === "withdrawal" ? (
                    <ArrowDownLeft className="text-[#961100] w-5 h-5" />
                  ) : (
                    <ArrowUpRight className=" text-[#075132] w-5 h-5" />
                  )}
                </div>

                <div>
                  <p className="font-medium text-base leading-6 text-[#131316]">
                    {t.metadata?.product_name || "Cash withdrawal"}
                  </p>
                  <p
                    className={`text-sm mt-2 leading-4 font-medium ${
                      t.status === "pending" && !t.metadata?.name
                        ? "text-[#A77A07]"
                        : t.status === "successful" && !t.metadata?.name
                        ? "text-[#0EA163]"
                        : "text-[#56616B]"
                    }`}
                  >
                    {t.metadata?.name || t.status}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-base text-[#131316] mb-1 leading-5">
                  USD {t.amount}
                </p>
                <p className="text-sm leading-4 font-medium text-[#56616B]">
                  {format(new Date(t.date), "MMM dd, yyyy")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionsList;
