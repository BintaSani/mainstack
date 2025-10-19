import { createContext, useContext, useState, type ReactNode } from "react";
import { startOfToday, subDays, startOfMonth, subMonths } from "date-fns";

export type FilterState = {
  startDate: Date | null;
  endDate: Date | null;
  types: string[];
  statuses: string[];
  quickRange: string | null;
};

type FilterContextType = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  tempFilters: FilterState;
  appliedFilters: FilterState;

  setTempFilters: (filters: Partial<FilterState>) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  appliedCount: number;
  setQuickRange: (range: string | null) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const defaultState: FilterState = {
    startDate: null,
    endDate: null,
    types: [],
    statuses: [],
    quickRange: null,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFiltersState] = useState<FilterState>({
    ...defaultState,
    // default selection
  });
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(defaultState);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  /** Update temporary filters (used while drawer is open) */
  const setTempFilters = (newFilters: Partial<FilterState>) => {
    setTempFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  /** Commit temporary filters to applied filters */
  const applyFilters = () => {
    setAppliedFilters(tempFilters);
    setIsOpen(false);
  };

  /** Reset everything */
  const clearFilters = () => {
    setTempFiltersState(defaultState);
    setAppliedFilters(defaultState);
  };

  /** Count of applied filters */
  const appliedCount = (() => {
    let count = 0;
    const { startDate, endDate, types, statuses, quickRange } = appliedFilters;

    if (quickRange) count += 1;
    if (!quickRange && (startDate || endDate)) count += 1;
    if (types.length > 0) count += 1;
    if (statuses.length > 0) count += 1;

    return count;
  })();

  /** Handle quick range logic */
  const setQuickRange = (range: string | null) => {
    const today = startOfToday();
    let start: Date | null = null;
    let end: Date | null = today;

    switch (range) {
      case "Today":
        start = today;
        break;
      case "Last 7 days":
        start = subDays(today, 6);
        break;
      case "This month":
        start = startOfMonth(today);
        break;
      case "Last 3 months":
        start = subMonths(today, 3);
        break;
      default:
        start = null;
    }

    setTempFiltersState((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
      quickRange: range,
    }));
  };

  return (
    <FilterContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
        tempFilters,
        appliedFilters,
        setTempFilters,
        applyFilters,
        clearFilters,
        setQuickRange,
        appliedCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
