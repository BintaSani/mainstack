import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../services/transactionService";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    refetchInterval: 10_000, // refetch every 10 seconds
    refetchOnWindowFocus: true, // refetch when window is focused
    staleTime: 5_000, // data is fresh for 5 seconds
  });
}
