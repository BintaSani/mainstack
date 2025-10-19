import { useFilter } from "@/shared/context/filterContext";
import DarkList from "../../../assets/darkList.svg";

const EmptyState = () => {
  const { clearFilters } = useFilter();
  return (
    <div
      data-testid="empty-state"
      className="flex flex-col py-24 px-6 w-[50%] xl:w-[48%] 2xl:w-[32%] mx-auto"
    >
      <div className="p-3 rounded-2xl w-fit bg-[#EFF1F6] flex items-center justify-center mb-5">
        <img src={DarkList} alt="DarkList" />
      </div>

      <h3 className="text-2xl xl:text-[1.75rem] leading-10 font-bold text-[#131316] mb-2.5">
        No matching transaction found for the selected filter
      </h3>
      <p className="text-[#56616B] max-w-sm mb-8 font-medium leading-6 2xl:sm xl:text-base">
        Change your filters to see more results, or add a new product.
      </p>

      <button
        onClick={clearFilters}
        data-testid="clear-filters-button"
        className="bg-[#EFF1F6] w-fit text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
      >
        Clear Filter
      </button>
    </div>
  );
};

export default EmptyState;
