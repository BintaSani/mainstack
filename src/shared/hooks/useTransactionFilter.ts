import { useState } from "react";

export function useTransactionFilter() {
  const [filters, setFilters] = useState({
    type: "all",
    startDate: null,
    endDate: null,
  });

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    updateFilter,
  };
}
