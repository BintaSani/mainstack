import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../services/userService";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
}
