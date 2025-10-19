import { useQuery } from "@tanstack/react-query";
import { fetchWallet } from "../services/userService";

export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: fetchWallet,
    refetchInterval: 10_000, // refetch every 10 seconds
    refetchOnWindowFocus: true, // refetch when window is focused
  });
}
