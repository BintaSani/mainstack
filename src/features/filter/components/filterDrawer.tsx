import { TfiClose } from "react-icons/tfi";
import TransactionTypeSelect from "./transactionType";
import TransactionStatusSelect from "./transactionStatus";
import DateRangePicker from "./dateRangePicker";
import { useFilter } from "@/shared/context/filterContext";

const FilterDrawer = () => {
  const {
    setQuickRange,

    tempFilters,
    applyFilters,
    isOpen,
    closeDrawer,
    clearFilters,
  } = useFilter();

  const hasFilters =
    tempFilters.types.length > 0 ||
    tempFilters.statuses.length > 0 ||
    tempFilters.startDate !== null ||
    tempFilters.endDate !== null ||
    tempFilters.quickRange !== null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        data-testid="filter-drawer"
        className={`fixed inset-0 h-screen bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 xl:w-[30%] w-full lg:w-[37%] 2xl:w-[27%] h-full bg-white rounded-l-[1.3rem] shadow-xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 ">
          <h3 className="text-2xl leading-8 font-bold text-[#131316]">
            Filter
          </h3>
          <button onClick={closeDrawer}>
            <TfiClose className="w-4 h-4 text-[#131316]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 mt-2 ">
          <div className="flex gap-3 flex-wrap mb-7">
            {["Today", "Last 7 days", "This month", "Last 3 months"].map(
              (label) => (
                <button
                  key={label}
                  className={`px-4 py-2 border hover:bg-gray-100 border-gray-300 rounded-full text-sm leading-4 font-bold text-[#131316] ${
                    tempFilters.quickRange === label ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setQuickRange(label)}
                >
                  {label}
                </button>
              )
            )}
          </div>

          <div>
            <DateRangePicker />
          </div>

          <div className="mt-6">
            <TransactionTypeSelect />
          </div>

          <div className="mt-6">
            <TransactionStatusSelect />
          </div>
        </div>

        {/* Footer - Stays fixed at bottom */}
        <div className="flex gap-3 px-6 py-4 bg-white rounded-bl-[1.3rem] ">
          <button
            onClick={clearFilters}
            className="w-1/2 py-3 hover:scale-105 hover:bg-[#131316] hover:text-white rounded-full font-medium border border-[#EFF1F6] "
          >
            Clear
          </button>
          <button
            disabled={!hasFilters}
            onClick={applyFilters}
            data-testid="apply-filters-button"
            className={`${
              !hasFilters ? "opacity-50 cursor-not-allowed" : ""
            } bg-gray-900 hover:scale-105  text-white w-1/2 py-3 rounded-full font-medium hover:bg-gray-800`}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
