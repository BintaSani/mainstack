import { api } from "./api";
import type { UserType } from "../types/userType";
import type { WalletType } from "../types/walletType";

export const fetchUser = async (): Promise<UserType> => {
  const { data } = await api.get("/user");
  return data;
};

export const fetchWallet = async (): Promise<WalletType> => {
  const { data } = await api.get("/wallet");
  return data;
};
